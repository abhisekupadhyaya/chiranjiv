#!/usr/bin/env python3
"""
Dummy User Generator for CSV Export

Flexible script to create any number of dummy users with custom naming
and configurable referral distribution. Exports to CSV format.

Author: Chiranjiv Team
Version: 2.0 (Python CSV Export)
"""

import csv
import json
import random
import argparse
from datetime import datetime, timedelta
from typing import List, Dict, Union, Optional
import uuid
import numpy as np

# Matplotlib import - optional for plotting
try:
    import matplotlib.pyplot as plt
    MATPLOTLIB_AVAILABLE = True
except ImportError:
    MATPLOTLIB_AVAILABLE = False


def generate_referral_code(user_id: str) -> str:
    """Generate a referral code based on user ID."""
    # Extract first part of UUID and generate random suffix
    id_part = user_id.upper().replace('-', '')[:8]
    random_suffix = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
    return f"CHR-{id_part}-{random_suffix}"


def generate_poisson_distribution(
    num_particles: int,
    lam: float = 0.65,
    min_sum_scale: float = 5000/8499,
    max_sum_scale: float = 6000/8499,
    max_iter: int = 10000,
    seed: int = 42
) -> tuple[np.ndarray, int]:
    """
    Generate Poisson-distributed referral counts.
    
    Args:
        num_particles: Number of users to generate values for
        lam: Lambda parameter for Poisson distribution
        min_sum_scale: Minimum sum scaling factor (default based on 5000/8499)
        max_sum_scale: Maximum sum scaling factor (default based on 6000/8499)
        max_iter: Maximum iterations to find valid distribution
        seed: Random seed for reproducibility
    
    Returns:
        Tuple of (array of referral counts, total sum)
    
    Raises:
        RuntimeError: If valid distribution not found within max_iter
    """
    # Scale the min/max sum based on number of particles
    min_sum = int(num_particles * min_sum_scale)
    max_sum = int(num_particles * max_sum_scale)
    
    rng = np.random.default_rng(seed)
    
    for iteration in range(max_iter):
        p_values = rng.poisson(lam, size=num_particles)
        total = p_values.sum()
        
        if min_sum <= total <= max_sum:
            num_zero = np.sum(p_values == 0)
            num_nonzero = num_particles - num_zero
            print(f"✓ Poisson distribution generated (iteration {iteration + 1}):")
            print(f"  - Lambda: {lam}")
            print(f"  - Total referrals: {total} (range: {min_sum}-{max_sum})")
            print(f"  - Zero values: {num_zero} ({num_zero/num_particles:.1%})")
            print(f"  - Non-zero values: {num_nonzero}")
            return p_values, int(total)
    
    raise RuntimeError(
        f"Could not generate Poisson distribution satisfying sum constraint "
        f"[{min_sum}, {max_sum}] within {max_iter} iterations. "
        f"Try adjusting lambda or scaling factors."
    )


def calculate_referral_distribution(
    count: int, 
    distribution: Union[str, List[int], None],
    poisson_params: Optional[Dict] = None
) -> List[int]:
    """
    Calculate referral counts for each user based on distribution type.
    
    Args:
        count: Number of users to create
        distribution: Can be:
            - List with single element: All users get that value
            - List with multiple elements: Use as provided, fill remaining with last value
            - "random": Random values 0-30
            - "decreasing": Start at 20 and decrease
            - "poisson": Poisson distribution (requires poisson_params)
            - None: Default pattern (20, 15, 10, 5, then 2s, then 1s)
        poisson_params: Dictionary with Poisson parameters (lam, min_sum_scale, max_sum_scale, max_iter, seed)
    
    Returns:
        List of referral counts for each user
    """
    referral_counts = []
    
    if isinstance(distribution, list):
        if len(distribution) == 1:
            # Single element: all users get this value
            referral_counts = [distribution[0]] * count
            print(f"✓ Using shorthand: All {count} users will have {distribution[0]} referrals")
        else:
            # Multiple elements: use as provided, fill remaining with last value
            referral_counts = distribution[:count]
            if len(referral_counts) < count:
                fill_value = referral_counts[-1] if referral_counts else 0
                referral_counts.extend([fill_value] * (count - len(referral_counts)))
    
    elif distribution == 'random':
        # Random distribution (0-30 referrals)
        referral_counts = [random.randint(0, 30) for _ in range(count)]
        # Sort descending for better ranking
        referral_counts.sort(reverse=True)
        print(f"✓ Using random distribution (0-30 referrals)")
    
    elif distribution == 'decreasing':
        # Decreasing from 20 down
        start_refs = 20
        referral_counts = [max(0, start_refs - i) for i in range(count)]
        print(f"✓ Using decreasing distribution (starting from {start_refs})")
    
    elif distribution == 'poisson':
        # Poisson distribution
        if poisson_params is None:
            poisson_params = {}
        p_values, total = generate_poisson_distribution(
            num_particles=count,
            **poisson_params
        )
        referral_counts = p_values.tolist()
    
    else:
        # Default: first few get higher counts, rest get 0-2
        for i in range(count):
            if i == 0:
                referral_counts.append(20)
            elif i == 1:
                referral_counts.append(15)
            elif i == 2:
                referral_counts.append(10)
            elif i == 3:
                referral_counts.append(5)
            elif i < 8:
                referral_counts.append(2)
            else:
                referral_counts.append(1)
        print(f"✓ Using default distribution pattern")
    
    return referral_counts


def create_dummy_users(count: int, 
                       referral_distribution: Union[str, List[int], None] = None,
                       start_index: int = 1,
                       poisson_params: Optional[Dict] = None) -> List[Dict]:
    """
    Create dummy user records with all required fields.
    
    Args:
        count: Number of dummy users to create (1-100000)
        referral_distribution: Distribution pattern for referrals
        start_index: Starting index for user IDs (default: 1)
        poisson_params: Dictionary with Poisson parameters (for 'poisson' distribution)
    
    Returns:
        List of user dictionaries with all required fields
    """
    if count < 1 or count > 100000:
        raise ValueError("Count must be between 1 and 100000")
    
    print(f"Creating {count} dummy users starting from index {start_index}...")
    
    # Calculate referral distribution
    referral_counts = calculate_referral_distribution(count, referral_distribution, poisson_params)
    
    # Base timestamp: November 1, 2025 00:00:00
    base_timestamp = datetime(2025, 11, 1, 0, 0, 0)
    
    # End timestamp: November 5, 2025 23:59:59
    end_timestamp = datetime(2025, 11, 5, 23, 59, 59)
    
    # Calculate time increment to spread users evenly across Nov 1-5
    time_window = (end_timestamp - base_timestamp).total_seconds()
    if count > 1:
        time_increment_seconds = time_window / (count - 1)
    else:
        time_increment_seconds = 0
    
    users = []
    
    for i in range(count):
        user_index = start_index + i
        
        # Generate unique ID (UUID format)
        user_id = str(uuid.uuid4())
        
        # Create timestamp spread evenly across Nov 1-5, 2025
        timestamp = base_timestamp + timedelta(seconds=i * time_increment_seconds)
        created_at_unix = int(timestamp.timestamp())
        
        # Generate dummy user data with all required fields
        user_data = {
            'id': user_id,
            'createdAt': created_at_unix,
            'address': 'Timbaktu, Earth',
            'age': 25,
            'consentDataUsagePolicy': 'v0.1',
            'consentMarketing': 'v0.1',
            'consentPrivacyPolicy': 'v0.1',
            'consentResearchContact': 'v0.1',
            'consentTermsOfService': 'v0.1',
            'email': f'roloh_tamasi_{user_index}@mail.com',
            'isDummy': True,
            'name': f'Roloh Tamasi_{user_index}',
            'phone': f'+91-00000-{str(1000 + user_index)[-5:]}',
            'referralCode': generate_referral_code(user_id),
            'referralsCount': referral_counts[i],
            'referredBy': '',  # Empty for dummy users (they weren't referred by anyone)
            'referredUserIds': '[]',  # Empty JSON array as string
            'usedReferralCode': ''  # Empty for dummy users
        }
        
        users.append(user_data)
        
        if (i + 1) % 100 == 0 or i == count - 1:
            print(f"  Generated {i + 1}/{count} users...")
    
    total_referrals = sum(referral_counts)
    print(f"✓ Successfully generated {count} dummy users with {total_referrals} total referrals")
    
    return users


def plot_distribution(referral_counts: List[int], save_path: Optional[str] = None, show: bool = False):
    """
    Plot histogram of referral count distribution.
    
    Args:
        referral_counts: List of referral counts
        save_path: Optional path to save the plot
        show: Whether to display the plot interactively
    """
    if not MATPLOTLIB_AVAILABLE:
        print("⚠ Matplotlib not available. Cannot generate plot.")
        print("  Install with: pip install matplotlib")
        return
    
    # Convert to numpy array for easier manipulation
    p_values = np.array(referral_counts)
    num_particles = len(p_values)
    num_zero = np.sum(p_values == 0)
    num_nonzero = num_particles - num_zero
    total_sum = p_values.sum()
    
    print("\nReferral Distribution Summary:")
    print(f"  num_particles   = {num_particles}")
    print(f"  total_sum       = {total_sum}")
    print(f"  num_zero        = {num_zero}")
    print(f"  num_nonzero     = {num_nonzero}")
    print(f"  fraction_zero   = {num_zero / num_particles:.3f}")
    
    # Create plot
    plt.figure(figsize=(10, 6))
    max_val = p_values.max()
    plt.hist(p_values, bins=range(int(max_val) + 2), align='left', rwidth=0.8, edgecolor='black')
    plt.xlabel("Referral Count", fontsize=12)
    plt.ylabel("Number of Users", fontsize=12)
    plt.title("Distribution of Referral Counts Across Users", fontsize=14, fontweight='bold')
    plt.xticks(range(int(max_val) + 1))
    plt.grid(axis='y', alpha=0.3)
    
    # Add text box with summary stats
    textstr = f'Total Users: {num_particles}\nTotal Referrals: {total_sum}\nZero Referrals: {num_zero} ({num_zero/num_particles:.1%})'
    plt.text(0.95, 0.95, textstr, transform=plt.gca().transAxes, fontsize=10,
             verticalalignment='top', horizontalalignment='right',
             bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=150, bbox_inches='tight')
        print(f"✓ Plot saved to {save_path}")
    
    if show:
        plt.show()
    else:
        plt.close()


def export_to_csv(users: List[Dict], output_file: str):
    """
    Export user data to CSV file.
    
    Args:
        users: List of user dictionaries
        output_file: Path to output CSV file
    """
    if not users:
        print("⚠ No users to export")
        return
    
    # Define field order (all fields from the sample JSON)
    fieldnames = [
        'id',
        'createdAt',
        'address',
        'age',
        'consentDataUsagePolicy',
        'consentMarketing',
        'consentPrivacyPolicy',
        'consentResearchContact',
        'consentTermsOfService',
        'email',
        'isDummy',
        'name',
        'phone',
        'referralCode',
        'referralsCount',
        'referredBy',
        'referredUserIds',
        'usedReferralCode'
    ]
    
    print(f"Exporting {len(users)} users to {output_file}...")
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(users)
    
    print(f"✓ Successfully exported to {output_file}")


def parse_referral_distribution(value: str) -> Union[str, List[int]]:
    """Parse referral distribution argument."""
    if value in ['random', 'decreasing', 'poisson']:
        return value
    
    # Try to parse as JSON array
    try:
        parsed = json.loads(value)
        if isinstance(parsed, list) and all(isinstance(x, int) for x in parsed):
            return parsed
        else:
            raise ValueError("Referral distribution array must contain only integers")
    except json.JSONDecodeError:
        raise ValueError(f"Invalid referral distribution: {value}. Must be 'random', 'decreasing', or a JSON array of integers")


def main():
    """Main CLI interface."""
    parser = argparse.ArgumentParser(
        description='Generate dummy users and export to CSV',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Create 10 users with default distribution
  python create_dummy_users.py --count 10 --output users.csv
  
  # Create 15 users with decreasing referrals (20, 19, 18...)
  python create_dummy_users.py --count 15 --referral-distribution decreasing --output users.csv
  
  # Create 20 users with random referrals (0-30)
  python create_dummy_users.py --count 20 --referral-distribution random --output users.csv
  
  # Create 10 users with specific referral counts
  python create_dummy_users.py --count 10 --referral-distribution '[20,15,10,5,2,2,2,2,1,1]' --output users.csv
  
  # Create 100 users all with 5 referrals (shorthand)
  python create_dummy_users.py --count 100 --referral-distribution '[5]' --output users.csv
  
  # Create users starting from index 101
  python create_dummy_users.py --count 50 --start-index 101 --output users.csv
  
  # Create 8499 users with Poisson distribution (default params)
  python create_dummy_users.py --count 8499 --referral-distribution poisson --output users.csv
  
  # Create users with Poisson distribution and show plot
  python create_dummy_users.py --count 5000 --referral-distribution poisson --plot --output users.csv
  
  # Create users with Poisson distribution and save plot
  python create_dummy_users.py --count 10000 --referral-distribution poisson --save-plot distribution.png --output users.csv
  
  # Create users with custom Poisson parameters
  python create_dummy_users.py --count 1000 --referral-distribution poisson --poisson-lambda 0.8 --poisson-min-sum-scale 0.6 --poisson-max-sum-scale 0.7 --output users.csv
        """
    )
    
    parser.add_argument(
        '--count',
        type=int,
        required=True,
        help='Number of dummy users to create (1-100000)'
    )
    
    parser.add_argument(
        '--referral-distribution',
        type=str,
        default=None,
        help='Referral distribution: "random", "decreasing", "poisson", or JSON array like "[20,15,10,5]"'
    )
    
    parser.add_argument(
        '--start-index',
        type=int,
        default=1,
        help='Starting index for user IDs (default: 1)'
    )
    
    parser.add_argument(
        '--output',
        type=str,
        default='dummy_users.csv',
        help='Output CSV file path (default: dummy_users.csv)'
    )
    
    # Poisson distribution parameters
    parser.add_argument(
        '--poisson-lambda',
        type=float,
        default=0.65,
        help='Lambda parameter for Poisson distribution (default: 0.65)'
    )
    
    parser.add_argument(
        '--poisson-min-sum-scale',
        type=float,
        default=5000/8499,
        help='Minimum sum scaling factor (default: 5000/8499 ≈ 0.588)'
    )
    
    parser.add_argument(
        '--poisson-max-sum-scale',
        type=float,
        default=6000/8499,
        help='Maximum sum scaling factor (default: 6000/8499 ≈ 0.706)'
    )
    
    parser.add_argument(
        '--poisson-max-iter',
        type=int,
        default=10000,
        help='Maximum iterations for Poisson generation (default: 10000)'
    )
    
    parser.add_argument(
        '--poisson-seed',
        type=int,
        default=42,
        help='Random seed for Poisson distribution (default: 42)'
    )
    
    # Plotting options
    parser.add_argument(
        '--plot',
        action='store_true',
        help='Display distribution plot interactively'
    )
    
    parser.add_argument(
        '--save-plot',
        type=str,
        default=None,
        help='Save distribution plot to file (e.g., distribution.png)'
    )
    
    args = parser.parse_args()
    
    # Parse referral distribution if provided
    referral_dist = None
    if args.referral_distribution:
        referral_dist = parse_referral_distribution(args.referral_distribution)
    
    # Prepare Poisson parameters if using Poisson distribution
    poisson_params = None
    if referral_dist == 'poisson':
        poisson_params = {
            'lam': args.poisson_lambda,
            'min_sum_scale': args.poisson_min_sum_scale,
            'max_sum_scale': args.poisson_max_sum_scale,
            'max_iter': args.poisson_max_iter,
            'seed': args.poisson_seed
        }
    
    try:
        # Generate users
        users = create_dummy_users(
            count=args.count,
            referral_distribution=referral_dist,
            start_index=args.start_index,
            poisson_params=poisson_params
        )
        
        # Export to CSV
        export_to_csv(users, args.output)
        
        # Generate plot if requested
        if args.plot or args.save_plot:
            referral_counts = [user['referralsCount'] for user in users]
            plot_distribution(
                referral_counts=referral_counts,
                save_path=args.save_plot,
                show=args.plot
            )
        
        print(f"\n✓ Done! Created {len(users)} dummy users in {args.output}")
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main())

