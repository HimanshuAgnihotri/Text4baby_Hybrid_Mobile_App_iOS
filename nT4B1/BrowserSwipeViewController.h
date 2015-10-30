//
//  BrowserSwipeViewController.h
//  nT4B2
//
//  Created by Gustavo on 8/20/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WeekSelectionProtocol.h"
#import "SwapViewProtocol.h"
#import "Support.h"

@interface BrowserSwipeViewController : UIViewController <UIWebViewDelegate, UIScrollViewDelegate, UITableViewDelegate, WeekSelectionDelegate, SwapViewProtocol>
{
    NSInteger currecntSelectedWeek;
}

@property (weak, nonatomic) IBOutlet UINavigationItem *NavTitle;
@property (weak, nonatomic) IBOutlet UIButton *btnWeek;
@property (weak, nonatomic) IBOutlet UIButton *btnPrev;
@property (weak, nonatomic) IBOutlet UIButton *btnNext;
@property (weak, nonatomic) IBOutlet UIView *viewNav;

@property (nonatomic, strong) NSMutableArray *viewControllers; // To receive the viewcontrollers from a previous screen (not used due to memory limitations)
@property (nonatomic, strong) NSArray *contentList; // List of pages to scroll through
@property (nonatomic, strong) NSString *contentLocation; // Location of those pages
@property (nonatomic, strong) NSString *imageLocation; // Location of images

- (IBAction)doPrev;
- (IBAction)doNext;
- (IBAction)doWeekSelection;

@property BOOL hasWeekNav;      // Should a header section for scrolling and week selection be displayed?
@property BOOL hasAccordions; // HTML content has expandable sections. If it has them, they will be automatically expanded when swiping
@property BOOL showWelcomeTitle;
@property NSString *t4bBlockPrefix;  // Name prefix of the block to expand
@property NSInteger weekOffset; // Difference between page 0 and first week number
@property NSString *userFirstName;
@property NSInteger userWeek;
@property T4bProtocols vcProtocol; // Track what protocol an instance is representing (for html functions that are specific to a protocol)

- (void)nextPage;
- (void)prevPage;
- (void)setPageTo:(NSInteger)page;
- (NSUInteger) getPageNumber;
- (NSString *) buildJSforVerticalAlignment;
- (NSString *) buildJSforAccordionAlignment;
- (void)hideWelcome;
- (void)weekBarSetupAndWelcome;
- (void)viewRefresh;

@end
