//
//  ContactUsViewController.h
//  nT4B2b
//
//  Created by Gustavo on 10/3/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ContactUsViewController : UIViewController <UIWebViewDelegate, UIAlertViewDelegate>

@property (nonatomic, weak) IBOutlet UIWebView *theWebView;

@end
