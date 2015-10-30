//
//  SignUpViewController.h
//  nT4B2b
//
//  Created by Gustavo on 10/4/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "T4bDefinitions.h"

@interface SignUpViewController : UIViewController <UIWebViewDelegate>

@property (nonatomic, weak) IBOutlet UIWebView *theWebView;

@property SignUpFunctions screenFunction;

@end