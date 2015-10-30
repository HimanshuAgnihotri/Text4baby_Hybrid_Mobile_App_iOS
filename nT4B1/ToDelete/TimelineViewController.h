//
//  BrowserSwipeViewController.h
//  nT4B2
//
//  Created by Gustavo on 8/20/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"

@interface TimelineViewController : UIViewController <UIScrollViewDelegate>
{
    AppDelegate *appdelegate;
}

@property (weak, nonatomic) IBOutlet UIBarButtonItem *btnBaby;




@property (weak, nonatomic) IBOutlet UINavigationItem *NavTitle;

@property (nonatomic, strong) NSMutableArray *viewControllers;
@property (nonatomic, strong) NSMutableArray *viewControllers2;
@property (nonatomic, strong) NSArray *contentList;
@property (nonatomic, strong) NSArray *contentList2;

@property (nonatomic, strong) NSString *contentLocation;
@property (nonatomic, strong) NSString *contentLocation2;

@property (strong, nonatomic) NSString *PageGroup;
@property (nonatomic) NSInteger PageNumber;


- (IBAction)doBabyButton;

- (void)switchProtocol;
- (void)updateProtocol;

@end
