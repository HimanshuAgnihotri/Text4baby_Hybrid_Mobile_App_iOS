//
//  MainTabBarController.h
//  nT4B2
//
//  Created by Gustavo on 7/1/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
//#import "BrowserSwipeViewController.h"

//#import "AppDelegate.h"
#import "Support.h"


@interface MainTabBarController : UITabBarController <UITabBarControllerDelegate>
{
    
}
@property T4bProtocols userT4bProtocol; // User's current protocol
@property NSUInteger userWeek; // User's current week
@property NSString *userFirstName; // User's first name
@property T4bProtocols visibleProtocol; // Protocol currently displayed (TODO: Replace use this property instead of appdelegate
@property UIImage *backgroundImage;

- (void)gotoMessageSettings;
- (void)countWebCompletions;
- (void)reset;

@end
