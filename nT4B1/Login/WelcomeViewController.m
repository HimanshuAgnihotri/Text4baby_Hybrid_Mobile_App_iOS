//
//  WelcomeViewController.m
//  nT4B2b
//
//  Created by Gustavo on 11/15/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "WelcomeViewController.h"
#import <QuartzCore/QuartzCore.h>

@interface WelcomeViewController ()

@end

@implementation WelcomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.viewMsg.layer.cornerRadius = 5;
    self.viewMsg.layer.masksToBounds = YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)doOk
{
    [UIView animateWithDuration:0.5
                     animations:^{
                         self.view.alpha = 0;
                     }
                     completion:^(BOOL x){
                         [self.view removeFromSuperview];
                     }
     ];
}

@end
