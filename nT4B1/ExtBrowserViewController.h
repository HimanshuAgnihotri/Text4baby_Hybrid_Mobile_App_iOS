//
//  ExtBrowserViewController.h
//  nC4L1
//
//  Created by Gustavo on 9/22/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ExtBrowserViewController : UIViewController <UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;
@property (weak, nonatomic) IBOutlet UIButton *btnGoBack;
@property (weak, nonatomic) IBOutlet UIButton *btnGoForward;
@property (weak, nonatomic) IBOutlet UIToolbar *toolBar;

@property (weak, nonatomic) NSURLRequest *loadURLRequest;

@property (weak, nonatomic) IBOutlet UIButton *btnDone;

- (IBAction)btnDone:(id)sender;
- (IBAction)btnGoBack:(id)sender;
- (IBAction)btnGoForward:(id)sender;

@end
