//
//  TimelineViewController.h
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"

@interface TimelineViewController : UIViewController <UIWebViewDelegate>
{
    AppDelegate *appdelegate;
    
}

@property (weak, nonatomic) IBOutlet UIWebView *theWebView;
@property (weak, nonatomic) IBOutlet UIWebView *theWebView2;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *btnBaby;

@property (strong, nonatomic) NSString *targetPage;
@property (strong, nonatomic) NSString *targetFolder;

/*
@property NSInteger Protocol; // 1=Pregnancy; 2=New Baby
@property NSInteger *t4bProtocol; // 1=Pregnancy; 2=New Baby
*/


- (IBAction)doBabyButton;

- (void)switchProtocol;
- (void)updateProtocol;


-(void)handleLeftSwipeFrom:(UISwipeGestureRecognizer *)recognizer;
-(void)handleRightSwipeFrom:(UISwipeGestureRecognizer *)recognizer;
-(void)handleLongPress:(UISwipeGestureRecognizer *)recognizer;
- (NSMutableArray *) allocateSwipeChildControllers: (NSInteger)numberOfControllers;

@end
