//
//  VisitOptionViewController.h
//  Text4baby
//
//  Created by Himanshu Agnihotri on 10/30/15.
//  Copyright (c) 2015 Voxiva, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface VisitOptionViewController : UIViewController
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UIButton *addORupdateDateBtn;
@property (weak, nonatomic) IBOutlet UIButton *moreVisitBtn;
- (IBAction)addORupdateBtnPressed:(id)sender;
- (IBAction)moreVisitBtnPressed:(id)sender;


@end
