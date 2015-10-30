//
//  SignInViewController.h
//  nT4B2b
//
//  Created by Gustavo on 10/3/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MainTabBarController.h"
#import "T4bDefinitions.h"

@interface SignInViewController : UIViewController <UIWebViewDelegate, UIScrollViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;

@property SignInFunctions screenFunction;

@end
