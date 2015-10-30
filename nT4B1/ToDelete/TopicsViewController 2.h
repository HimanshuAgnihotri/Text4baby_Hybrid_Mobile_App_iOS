//
//  TimelineViewController.h
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface TopicsViewController : UIViewController <UIWebViewDelegate>

@property UIWebView *theWebView;
@property UIWebView *theWebView2;
@property (strong, nonatomic) IBOutlet UIBarButtonItem *btnBaby;

@property (strong, nonatomic) NSString *targetPage;
@property (strong, nonatomic) NSString *targetFolder;

- (IBAction)doBabyButton;

- (void)switchProtocol;
- (void)updateProtocol;

/*
-(void)handleLeftSwipeFrom:(UISwipeGestureRecognizer *)recognizer;
-(void)handleRightSwipeFrom:(UISwipeGestureRecognizer *)recognizer;
-(void)handleLongPress:(UISwipeGestureRecognizer *)recognizer;
*/

@end
