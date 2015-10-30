//
//  MoreViewController.h
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MoreOptionsViewController.h"

@interface MoreViewController : UIViewController <UIWebViewDelegate, UIAlertViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;

@property (strong, nonatomic) NSString *targetPage;
@property (strong, nonatomic) NSString *targetFolder;

- (void)gotoMoreOptions:(MoreFunctions)nextScreen;

@end
