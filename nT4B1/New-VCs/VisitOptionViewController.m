//
//  VisitOptionViewController.m
//  Text4baby
//
//  Created by Himanshu Agnihotri on 10/30/15.
//  Copyright (c) 2015 Voxiva, Inc. All rights reserved.
//

#import "VisitOptionViewController.h"
#import "VisitorDesignType1Cell.h"
#import "VisitorDesignType2Cell.h"

@interface VisitOptionViewController ()

@end

@implementation VisitOptionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"%s",__PRETTY_FUNCTION__);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)addORupdateBtnPressed:(id)sender {
}

- (IBAction)moreVisitBtnPressed:(id)sender {
}

#pragma mark -- UITableViewDataSource


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 7;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row%2 == 1) {
        //First and odd row sequence
        static NSString *cellIdentifier = @"type1";
        VisitorDesignType1Cell *cell = (VisitorDesignType1Cell*)[tableView dequeueReusableCellWithIdentifier:cellIdentifier];
        if(cell == nil)
        {
            NSArray *nibArray = [[NSBundle mainBundle] loadNibNamed:@"VisitorDesignType1Cell" owner:nil options:nil];
            cell = [nibArray objectAtIndex:0];
           
        }
        return cell;
    }
    if (indexPath.row%2 == 0) {
        //Second and even row sequence
        static NSString *cellIdentifier = @"type2";
        VisitorDesignType2Cell *cell = (VisitorDesignType2Cell*)[tableView dequeueReusableCellWithIdentifier:cellIdentifier];
        if(cell == nil)
        {
            NSArray *nibArray = [[NSBundle mainBundle] loadNibNamed:@"VisitorDesignType2Cell" owner:nil options:nil];
            cell = [nibArray objectAtIndex:0];

        }
        return cell;
    }
    return nil;
}

#pragma mark -- UITableViewDelegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 80;
}
@end
