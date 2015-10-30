//
//  BrowserViewController.h
//  nT4B1
//
//  Created by Gustavo on 5/25/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BrowserViewController : UIViewController <UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;

@property (strong, nonatomic) NSURL *targetURL;
@property id<UIWebViewDelegate> targetDelegate;

@end
