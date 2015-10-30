//
//  MoreOptionsViewController.h
//  nT4B2b
//
//  Created by Gustavo on 10/24/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MoreOptionsViewController : UIViewController <UIWebViewDelegate, UIScrollViewDelegate, UIAlertViewDelegate>

enum {
    MoreFunctionNone = 0,
    MoreFunctionAccountSettings = 1,
    MoreFunctionMessageSettings = 2,
    MoreFunctionBadges = 3,
    MoreFunctionContactUs = 4,
    MoreFunctionAbout = 5,
    MoreFunctionTerms = 6,
    MoreFunctionPrivacy = 7,
    MoreFunctionClearData = 8,
    MoreFunctionLogout = 9,
    MoreFunctionCarrierList = 10,
};
typedef NSUInteger MoreFunctions;

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;

@property MoreFunctions screenFunction;

@end
