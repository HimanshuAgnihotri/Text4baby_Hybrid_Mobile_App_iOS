//
//  SwapViewController.h
//  nT4B2
//
//  Created by Gustavo on 8/31/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
//#import "AppDelegate.h"
#import "SwapViewProtocol.h"
//#import "BrowserSwipeProtocol.h"

@class MainTabBarController;

@interface SwapViewController : UIViewController //<BrowserSwipeDelegate>
{
//    AppDelegate *appdelegate;
}
@property (weak, nonatomic) IBOutlet UIBarButtonItem *btnBaby;

@property (weak, nonatomic) IBOutlet UIView *view1;
@property (weak, nonatomic) IBOutlet UIView *view2;

@property (weak, nonatomic) UIViewController <SwapViewProtocol> *vc1;
@property (weak, nonatomic) UIViewController <SwapViewProtocol> *vc2;

- (IBAction)doBabyButton;

- (void)switchProtocol;
- (void)updateProtocol;

- (void) refreshCurrentView;

- (void)updateChildBounds;

@end
