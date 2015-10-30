//
//  WaitViewController.m
//  nT4B2b
//
//  Created by Gustavo on 11/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "WaitViewController.h"
#import <QuartzCore/QuartzCore.h>

@interface WaitViewController ()

@end

@implementation WaitViewController

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

@end
