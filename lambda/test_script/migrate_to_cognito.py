#!/usr/bin/env python3
"""
Firebase to Cognito User Migration Script

This script converts Firebase waitlist export data to AWS Cognito import format.
"""

import csv
import sys
import os
from pathlib import Path
import boto3
from botocore.exceptions import BotoCoreError, ClientError


def format_phone_number(phone):
    """Normalize phone to E.164: digits only with a leading '+'."""
    if not phone:
        return ""
    raw = str(phone).strip()
    # Keep only digits
    digits = "".join(ch for ch in raw if ch.isdigit())
    if not digits:
        return ""
    # Prepend '+' if missing
    return f"+{digits}" if not raw.startswith('+') else f"+{digits}"


def get_cognito_csv_headers(user_pool_id, template_file=None):
    """
    Fetch the correct CSV headers from AWS Cognito for the specified user pool.
    Falls back to template file if API access is denied.
    
    Args:
        user_pool_id: The Cognito User Pool ID
        template_file: Optional path to a template CSV file to use as fallback
        
    Returns:
        List of header strings for the CSV file
    """
    # Try to fetch from Cognito API first
    try:
        client = boto3.client('cognito-idp')
        response = client.get_csv_header(UserPoolId=user_pool_id)
        
        # The response contains a list of header names
        if 'CSVHeader' in response:
            headers = response['CSVHeader']
            print(f"✓ Retrieved {len(headers)} CSV headers from Cognito User Pool via API")
            return headers
        else:
            raise ValueError("No CSVHeader found in response")
            
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', '')
        
        # If access denied, try fallback to template file
        if error_code == 'AccessDeniedException':
            print(f"⚠ Warning: No permission to call GetCSVHeader API", file=sys.stderr)
            
            # Try to read from template file
            if template_file and Path(template_file).exists():
                try:
                    print(f"  Using template file: {template_file}")
                    with open(template_file, 'r', encoding='utf-8') as f:
                        reader = csv.reader(f)
                        headers = next(reader)
                        print(f"✓ Using {len(headers)} headers from template file")
                        return headers
                except Exception as template_err:
                    print(f"✗ Error reading template file: {template_err}", file=sys.stderr)
            
            # If no template file provided or failed, raise the original error
            print(f"✗ Error: Cannot proceed without CSV headers", file=sys.stderr)
            print(f"  Either grant cognito-idp:GetCSVHeader permission or provide a template file", file=sys.stderr)
            raise
        else:
            # For other errors, raise
            print(f"✗ Error fetching CSV headers from Cognito: {e}", file=sys.stderr)
            raise
            
    except BotoCoreError as e:
        print(f"✗ Error connecting to AWS: {e}", file=sys.stderr)
        raise


def migrate_firebase_to_cognito(input_file, output_file, user_pool_id, template_file=None):
    """
    Migrate user data from Firebase export format to Cognito import format.
    
    Args:
        input_file: Path to Firebase waitlist export CSV
        output_file: Path to output Cognito import CSV
        user_pool_id: AWS Cognito User Pool ID
        template_file: Optional path to template CSV file for fallback headers
    """
    # Fetch Cognito CSV headers from AWS (or use template file)
    print(f"Fetching CSV headers for User Pool: {user_pool_id}")
    cognito_headers = get_cognito_csv_headers(user_pool_id, template_file)
    
    users_migrated = 0
    
    # Define mapping for Firebase to Cognito fields
    # Address is flattened to remove newlines
    field_mapping = {
        'name': lambda row: row.get('name', '').strip(),
        'email': lambda row: row.get('email', '').strip(),
        'email_verified': lambda row: row.get('emailVerified', 'false').lower(),
        'phone_number': lambda row: format_phone_number(row.get('phone', '')),
        'phone_number_verified': lambda row: 'false',
        'address': lambda row: row.get('address', '').replace('\n', ', ').replace('\r', '').strip(),
        # Username must be email or phone per pool settings
        'cognito:username': lambda row: (
            (row.get('email', '') or '').strip()
            or format_phone_number(row.get('phone', ''))
        ),
    }
    
    try:
        # Read Firebase export
        with open(input_file, 'r', encoding='utf-8') as infile:
            firebase_reader = csv.DictReader(infile)
            
            # Write Cognito import without quotes (plain CSV)
            with open(output_file, 'w', encoding='utf-8', newline='') as outfile:
                cognito_writer = csv.DictWriter(outfile, fieldnames=cognito_headers, quoting=csv.QUOTE_NONE, escapechar='\\')
                cognito_writer.writeheader()
                
                for row in firebase_reader:
                    # Initialize all fields as empty
                    cognito_row = {header: '' for header in cognito_headers}
                    
                    # Map Firebase fields to Cognito fields based on field_mapping
                    for cognito_field, firebase_mapper in field_mapping.items():
                        if cognito_field in cognito_row:
                            cognito_row[cognito_field] = firebase_mapper(row)
                    
                    cognito_writer.writerow(cognito_row)
                    users_migrated += 1
        
        print(f"✓ Migration complete!")
        print(f"  Input file: {input_file}")
        print(f"  Output file: {output_file}")
        print(f"  Users migrated: {users_migrated}")
        
        return True
        
    except FileNotFoundError as e:
        print(f"✗ Error: Input file not found - {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"✗ Error during migration: {e}", file=sys.stderr)
        return False


def main():
    """Main entry point for the migration script."""
    # Get user pool ID from environment variable or command line
    user_pool_id = os.environ.get('COGNITO_USER_POOL_ID')
    
    # Default file paths
    input_file = Path('/workspace/data/waitlist-export_20nov.csv')
    output_file = Path('/workspace/data/cognito_import.csv')
    template_file = Path('/workspace/chiranjiv/lambda/test_script/cognito_template.csv')
    
    # Allow command-line overrides
    # Usage: script.py [user_pool_id] [input_file] [output_file] [template_file]
    if len(sys.argv) >= 2:
        user_pool_id = sys.argv[1]
    if len(sys.argv) >= 3:
        input_file = Path(sys.argv[2])
    if len(sys.argv) >= 4:
        output_file = Path(sys.argv[3])
    if len(sys.argv) >= 5:
        template_file = Path(sys.argv[4])
    
    # Check if template file exists, if not, set to None
    if not template_file.exists():
        template_file = None
    
    if not user_pool_id:
        print("✗ Error: Cognito User Pool ID is required", file=sys.stderr)
        print("\nUsage:", file=sys.stderr)
        print("  python migrate_to_cognito.py <user_pool_id> [input_file] [output_file] [template_file]", file=sys.stderr)
        print("\nOr set environment variable:", file=sys.stderr)
        print("  export COGNITO_USER_POOL_ID=<your_user_pool_id>", file=sys.stderr)
        sys.exit(1)
    
    print("Firebase to Cognito User Migration")
    print("=" * 50)
    print(f"User Pool ID: {user_pool_id}")
    print(f"Input file: {input_file}")
    print(f"Output file: {output_file}")
    if template_file:
        print(f"Template file: {template_file}")
    print()
    
    success = migrate_firebase_to_cognito(input_file, output_file, user_pool_id, template_file)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()

