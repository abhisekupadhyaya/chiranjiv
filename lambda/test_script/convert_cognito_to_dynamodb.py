#!/usr/bin/env python3
"""
Convert Cognito output CSV to DynamoDB export CSV format.

This script reads cognitio_output_filtered.csv and converts it to match
the DynamoDB export format with proper field mappings, timestamp conversion,
and referral code generation.
"""

import csv
import random
import string
import re
from datetime import datetime
from typing import Set


def generate_referral_code(user_id: str, existing_codes: Set[str]) -> str:
    """
    Generate a unique referral code using the same logic as the Lambda function.
    Format: CHR-{first_8_chars_of_id_uppercase}-{8_random_chars}
    
    Args:
        user_id: The user's ID (sub from Cognito)
        existing_codes: Set of already generated codes to ensure uniqueness
    
    Returns:
        A unique referral code
    """
    attempts = 0
    while attempts < 100:
        random_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
        user_part = re.sub(r"[^A-Z0-9]", "", (user_id[:8] if user_id else "").upper())
        referral_code = f"CHR-{user_part}-{random_part}"
        
        if referral_code not in existing_codes:
            existing_codes.add(referral_code)
            return referral_code
        
        attempts += 1
    
    raise Exception(f"Failed to generate unique referral code for user {user_id}")


def convert_iso_to_unix_timestamp(iso_timestamp: str) -> int:
    """
    Convert ISO 8601 timestamp to Unix timestamp.
    
    Args:
        iso_timestamp: ISO format timestamp (e.g., "2025-11-21T01:02:08.567000+00:00")
    
    Returns:
        Unix timestamp as integer
    """
    try:
        # Parse ISO 8601 format with timezone
        dt = datetime.fromisoformat(iso_timestamp.replace('+00:00', '+0000'))
        return int(dt.timestamp())
    except Exception as e:
        print(f"Warning: Could not parse timestamp '{iso_timestamp}': {e}")
        # Return current time as fallback
        return int(datetime.now().timestamp())


def convert_cognito_to_dynamodb(input_file: str, output_file: str):
    """
    Convert Cognito CSV to DynamoDB format CSV.
    
    Args:
        input_file: Path to input CSV (cognitio_output_filtered.csv)
        output_file: Path to output CSV
    """
    # Track generated referral codes to ensure uniqueness
    existing_codes: Set[str] = set()
    
    # DynamoDB CSV header (in the correct order)
    dynamodb_headers = [
        'address', 'age', 'consentDataUsagePolicy', 'consentMarketing',
        'consentPrivacyPolicy', 'consentResearchContact', 'consentTermsOfService',
        'createdAt', 'email', 'id', 'isDummy', 'name', 'phone', 'referralCode',
        'referralsCount', 'referredBy', 'referredUserIds', 'usedReferralCode'
    ]
    
    rows_converted = 0
    
    with open(input_file, 'r', encoding='utf-8') as infile, \
         open(output_file, 'w', encoding='utf-8', newline='') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=dynamodb_headers)
        
        # Write header
        writer.writeheader()
        
        # Process each row
        for row in reader:
            # Generate unique referral code
            user_id = row.get('sub', '')
            referral_code = generate_referral_code(user_id, existing_codes)
            
            # Convert timestamp
            created_at_iso = row.get('user_create_date', '')
            created_at_unix = convert_iso_to_unix_timestamp(created_at_iso)
            
            # Map fields to DynamoDB format
            dynamodb_row = {
                'address': row.get('address', ''),
                'age': row.get('age', ''),
                'consentDataUsagePolicy': 'v0.1',
                'consentMarketing': 'v0.1',
                'consentPrivacyPolicy': 'v0.1',
                'consentResearchContact': 'v0.1',
                'consentTermsOfService': 'v0.1',
                'createdAt': created_at_unix,
                'email': row.get('email', ''),
                'id': user_id,
                'isDummy': False,
                'name': row.get('name', ''),
                'phone': row.get('phone_number', ''),
                'referralCode': referral_code,
                'referralsCount': row.get('referralsCount', '0'),
                'referredBy': '',
                'referredUserIds': '[]',
                'usedReferralCode': ''
            }
            
            writer.writerow(dynamodb_row)
            rows_converted += 1
    
    print(f"✓ Conversion complete!")
    print(f"  Input file:  {input_file}")
    print(f"  Output file: {output_file}")
    print(f"  Rows converted: {rows_converted}")


if __name__ == '__main__':
    input_csv = '/workspace/scripts/cognitio_output_filtered.csv'
    output_csv = '/workspace/scripts/cognito_to_dynamodb_converted.csv'
    
    print("Converting Cognito CSV to DynamoDB format...")
    print("-" * 60)
    
    convert_cognito_to_dynamodb(input_csv, output_csv)

