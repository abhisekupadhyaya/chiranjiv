#!/usr/bin/env python3
"""
Calculate User Rank from CSV Data

Calculates the rank of a target user (e.g., Hemant) among dummy users
generated from create_dummy_users.py, using the same ranking logic as
the chiranjiv-waitlist-rank Lambda function.

Author: Chiranjiv Team
Version: 1.0
"""

import csv
import json
import argparse
from typing import List, Dict, Any, Union


def parse_dynamodb_json(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    Parse DynamoDB JSON format to regular Python dictionary.
    
    DynamoDB JSON format uses type descriptors like:
    - {"S": "value"} for strings
    - {"N": "123"} for numbers
    - {"BOOL": true/false} for booleans
    - {"NULL": true} for null values
    - {"L": []} for lists
    
    Args:
        item: DynamoDB-formatted dictionary
    
    Returns:
        Regular Python dictionary
    """
    result = {}
    
    for key, value_obj in item.items():
        if isinstance(value_obj, dict):
            if "S" in value_obj:
                # String
                result[key] = value_obj["S"]
            elif "N" in value_obj:
                # Number (convert to int)
                result[key] = int(value_obj["N"])
            elif "BOOL" in value_obj:
                # Boolean
                result[key] = value_obj["BOOL"]
            elif "NULL" in value_obj:
                # Null
                result[key] = None
            elif "L" in value_obj:
                # List
                result[key] = value_obj["L"]
            else:
                # Unknown format, keep as is
                result[key] = value_obj
        else:
            result[key] = value_obj
    
    return result


def read_users_from_csv(csv_file: str) -> List[Dict[str, Any]]:
    """
    Read user data from CSV file.
    
    Args:
        csv_file: Path to CSV file
    
    Returns:
        List of user dictionaries
    """
    users = []
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Convert string values to appropriate types
            user = {
                'id': row['id'],
                'createdAt': int(row['createdAt']),
                'address': row['address'],
                'age': int(row['age']),
                'consentDataUsagePolicy': row['consentDataUsagePolicy'],
                'consentMarketing': row['consentMarketing'],
                'consentPrivacyPolicy': row['consentPrivacyPolicy'],
                'consentResearchContact': row['consentResearchContact'],
                'consentTermsOfService': row['consentTermsOfService'],
                'email': row['email'],
                'isDummy': row['isDummy'].lower() == 'true',
                'name': row['name'],
                'phone': row['phone'],
                'referralCode': row['referralCode'],
                'referralsCount': int(row['referralsCount']),
                'referredBy': row['referredBy'],
                'referredUserIds': row['referredUserIds'],
                'usedReferralCode': row['usedReferralCode']
            }
            users.append(user)
    
    return users


def calculate_rank(target_user: Dict[str, Any], all_users: List[Dict[str, Any]]) -> tuple[int, int]:
    """
    Calculate rank of target user among all users.
    
    Uses the same ranking logic as chiranjiv-waitlist-rank Lambda function:
    - Higher referralsCount ranks higher
    - If referralsCount is equal, earlier createdAt ranks higher
    - If both are equal, lexicographically smaller id ranks higher
    
    Args:
        target_user: The user to calculate rank for
        all_users: List of all users (including target)
    
    Returns:
        Tuple of (rank, total_users)
    """
    target_id = target_user['id']
    target_referrals = target_user['referralsCount']
    target_created_at = target_user['createdAt']
    
    num_above = 0
    total_users = len(all_users)
    
    for user in all_users:
        user_id = user['id']
        user_referrals = user['referralsCount']
        user_created_at = user['createdAt']
        
        # Skip the target user
        if user_id == target_id:
            continue
        
        # Count users that rank above the target user
        # Using the exact logic from Lambda (lines 123-138)
        if (
            (user_referrals > target_referrals)
            or (
                user_referrals == target_referrals
                and user_created_at < target_created_at
            )
            or (
                user_referrals == target_referrals
                and user_created_at == target_created_at
                and str(user_id) < str(target_id)
            )
        ):
            num_above += 1
    
    rank = num_above + 1
    return rank, total_users


def main():
    """Main CLI interface."""
    parser = argparse.ArgumentParser(
        description='Calculate user rank from CSV data',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Calculate Hemant's rank from dummy_users.csv
  python calculate_rank.py --users-csv dummy_users.csv
  
  # Use a different target user JSON file
  python calculate_rank.py --target-user other_user.json --users-csv users.csv
  
  # Verbose output
  python calculate_rank.py --users-csv dummy_users.csv --verbose
        """
    )
    
    parser.add_argument(
        '--target-user',
        type=str,
        default='scripts/hemant.json',
        help='Path to target user JSON file (DynamoDB format, default: scripts/hemant.json)'
    )
    
    parser.add_argument(
        '--users-csv',
        type=str,
        required=True,
        help='Path to CSV file with dummy users'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Show detailed output'
    )
    
    args = parser.parse_args()
    
    try:
        # Load target user from JSON file
        print(f"Loading target user from {args.target_user}...")
        with open(args.target_user, 'r', encoding='utf-8') as f:
            dynamodb_user = json.load(f)
        
        target_user = parse_dynamodb_json(dynamodb_user)
        print(f"✓ Loaded user: {target_user.get('name', 'Unknown')}")
        
        # Load all users from CSV
        print(f"\nLoading users from {args.users_csv}...")
        csv_users = read_users_from_csv(args.users_csv)
        print(f"✓ Loaded {len(csv_users)} users from CSV")
        
        # Combine all users (include target user)
        all_users = csv_users + [target_user]
        
        if args.verbose:
            print(f"\nTotal users in ranking: {len(all_users)}")
            print(f"  - CSV users: {len(csv_users)}")
            print(f"  - Target user: 1")
        
        # Calculate rank
        print(f"\nCalculating rank...")
        rank, total_users = calculate_rank(target_user, all_users)
        
        # Display results
        print("\n" + "=" * 60)
        print("RANK CALCULATION RESULTS")
        print("=" * 60)
        print(f"User Name:        {target_user.get('name', 'N/A')}")
        print(f"User ID:          {target_user.get('id', 'N/A')}")
        print(f"Email:            {target_user.get('email', 'N/A')}")
        print(f"Referral Code:    {target_user.get('referralCode', 'N/A')}")
        print(f"Referrals Count:  {target_user.get('referralsCount', 0)}")
        print(f"Created At:       {target_user.get('createdAt', 0)}")
        print(f"\nRank:             {rank} / {total_users}")
        print(f"Percentile:       {((total_users - rank) / total_users * 100):.2f}%")
        print("=" * 60)
        
        if args.verbose:
            # Show some statistics
            print("\nRanking Statistics:")
            referral_counts = [u['referralsCount'] for u in all_users]
            print(f"  - Max referrals: {max(referral_counts)}")
            print(f"  - Min referrals: {min(referral_counts)}")
            print(f"  - Avg referrals: {sum(referral_counts) / len(referral_counts):.2f}")
            
            # Count users with same referral count as target
            same_count = sum(1 for u in all_users if u['referralsCount'] == target_user['referralsCount'])
            print(f"  - Users with {target_user['referralsCount']} referrals: {same_count}")
        
        return 0
        
    except FileNotFoundError as e:
        print(f"✗ Error: File not found - {e}")
        return 1
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    exit(main())

