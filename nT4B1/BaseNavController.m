//
//  BaseNavController.m
//  nT4B2b
//
//  Created by Gustavo on 11/25/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "BaseNavController.h"

@interface BaseNavController ()

@end

@implementation BaseNavController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.allowedOrientations = UIInterfaceOrientationMaskPortrait;
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

// Disabled as it worked well with iOS 7 but not called on iOS 8

/*
- (NSUInteger)supportedInterfaceOrientations {
    return self.allowedOrientations;
}

- (BOOL)shouldAutorotate {
    return YES;
}
*/
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
