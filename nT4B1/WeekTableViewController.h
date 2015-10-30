//
//  WeekTableViewController.h
//  nT4B2b - Text4baby App
//
//  Created by Gustavo on 10/5/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WeekSelectionProtocol.h"

@interface WeekTableViewController : UITableViewController

@property NSUInteger currentWeek;   // To set current visible week before week selection dialog is displayed
@property NSInteger userWeek;       // User's home week
@property NSUInteger weekOffset;    // To calculate week number beginning with zero
@property NSArray *weekList;        // List of weeks
@property NSString *weekImageLocation; // Locaion of week images within www folder
@property (strong, nonatomic) id <WeekSelectionDelegate> weekDelegate; // To set delegate containing function to be called when a week selection is made
@property BOOL forCurrentProtocol;  // Indicates if weeks to be displayed are for user's current protocol

- (IBAction)btnClose:(id)sender;
- (IBAction)btnHome:(id)sender;
@end
