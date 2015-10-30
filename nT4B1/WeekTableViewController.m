//
//  WeekTableViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/5/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "WeekTableViewController.h"
#import "Support.h"

@interface WeekTableViewController ()

@end

@implementation WeekTableViewController


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // If clear is enabled, selected week shows up for a brief moment and then it is cleared out
    self.clearsSelectionOnViewWillAppear = NO;
    
    // Pre-select current week
    [self.tableView selectRowAtIndexPath: [self getIndexPathFromAbsoluteRow:self.currentWeek] animated:YES scrollPosition:UITableViewScrollPositionMiddle];

    // selectRowAtIndexPath is not displaying correctly for the last 2 rows, so...
    if (self.currentWeek > self.weekList.count-8)
        [self.tableView setContentOffset:CGPointMake(0, CGFLOAT_MAX)];
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)btnClose:(id)sender
{
    // Close the week selection dialog with no action
    [self dismissViewControllerAnimated:YES completion:nil];
}
- (IBAction)btnHome:(id)sender
{
    [self.weekDelegate gotoHomeWeek];
    [self dismissViewControllerAnimated:YES completion:nil];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    if (self.weekOffset == 4)
        return 3;
    else
        return 13; // Not using sections so there is only one
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    if (self.weekOffset == 4)
    {
        switch (section) {
            case 0:
                return 10;
                break;
            case 1:
                return 14;
                break;
            case 2:
                return 15;
                break;
            default:
                break;
        }
    }
    else
        return 4;
    return 1;//[self.weekList count];
}
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    if (self.weekOffset == 4)
    {
        switch (section) {
            case 0:
                return @"First Trimester";
                break;
            case 1:
                return @"Second Trimester";
                break;
            case 2:
                return @"Third Trimester";
                break;
            default:
                break;
        }
    }
    else
    {
        if (section == 0)
            return @"Newborn";
        if (section == 1)
            return @"Baby at 1 Month";
        else
            return [NSString stringWithFormat:@"Baby at %li Months", (long)section];
    }
    return @"";
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    // Configure the cell...
    // Blue cell selection background:
    // http://stackoverflow.com/questions/18794080/ios7-uitableviewcell-selectionstyle-wont-go-back-to-blue
    
    static NSString *simpleTableIdentifier = @"WeekCell";
    
    NSInteger cellRow = [self getAbsoluteRowForIndexPath:indexPath];

    // Create a new blank cell from template
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:simpleTableIdentifier];
    }
    
    // Get values for individual week from week dictionary
    NSDictionary *numberItem = [self.weekList objectAtIndex:cellRow];
    NSString* weekName = [numberItem valueForKey:@"Name"];
    NSString* weekImage = [numberItem valueForKey:@"Image"];
//    NSString* weekDetail = [numberItem valueForKey:@"Detail"];
    
    NSString *path = [[NSBundle mainBundle] pathForResource:weekImage ofType:@"" inDirectory:self.weekImageLocation];
    UIImage *theImage = [UIImage imageWithContentsOfFile:path];
    self.navigationItem.title = @"Week Selection";
    
   
    // Apply values to new cell
    if (self.weekOffset == 4) // TODO: Remove this IF once it is decided what week content to include for each protocol
    {
        cell.textLabel.text = [NSString stringWithFormat:@"Week %li: %@", (long)(cellRow + self.weekOffset), weekName];
        cell.imageView.image = theImage;
        
    }
    else
    {
        cell.textLabel.text = [NSString stringWithFormat:@"Week %i", (int)(cellRow + self.weekOffset)];

        if ( [self getAbsoluteRowForIndexPath:indexPath] <4 )
            if (indexPath.row==1)
                cell.imageView.image = [UIImage imageNamed:@"week1-4.png"];
            else
                cell.imageView.image = [WeekTableViewController imageWithColor:[UIColor clearColor] andSize:CGSizeMake(100.0, 78.0)];
        else
            if (indexPath.row==1)
                cell.imageView.image = theImage;
            else
                cell.imageView.image = [WeekTableViewController imageWithColor:[UIColor clearColor] andSize:CGSizeMake(100.0, 78.0)];
    }
    NSString *detailTextStr = @" ";
    if (self.userWeek >=0 && cellRow == self.userWeek && _forCurrentProtocol)
    {
        //cell.detailTextLabel.text = @"** This is your current week **";
        detailTextStr = @"** This is your current week **";
        
    }
    else
    {
        detailTextStr = @" ";
       
    }
    cell.detailTextLabel.text = detailTextStr;
    
    //NSLog(@" self.userWeek:%li cellRow:%ld isCurrentProtocol:%i",(long)self.userWeek,(long)cellRow, [[NSNumber numberWithBool:_forCurrentProtocol] intValue]);
   
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    //    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    //NSLog(@"Before3 Value:self.userWeek:%li",(long)self.userWeek);
    NSInteger row = [self getAbsoluteRowForIndexPath:indexPath];
    //NSLog(@"You selected: %li", (long)indexPath.row);

    // Send selected week back to Timeline View thru delegate
    [self.weekDelegate updateWeekSelection:row];
    [self dismissViewControllerAnimated:YES completion:nil];
   //  NSLog(@"%s self.userWeek:%li cellRow:%ld isCurrentProtocol:%i",__PRETTY_FUNCTION__,(long)self.userWeek,(long)indexPath.row, [[NSNumber numberWithBool:_forCurrentProtocol] intValue]);
   //  NSLog(@"After3 Value:self.userWeek:%li",(long)self.userWeek);
}

- (NSInteger) getAbsoluteRowForIndexPath: (NSIndexPath *) ip
{
    NSInteger rowNumber = 0;
    
    for (NSInteger i = 0; i < ip.section; i++) {
        rowNumber += [self tableView:self.tableView numberOfRowsInSection:i];
    }
    
    rowNumber += ip.row;
    return rowNumber;
}

- (NSIndexPath *) getIndexPathFromAbsoluteRow: (NSInteger) absRow
{
    NSInteger finalSection = 0;
    NSInteger finalRow = 0;
    NSInteger numSections = [self numberOfSectionsInTableView:self.tableView];
    NSIndexPath *result;
    
//    absRow++; // Make the absolute row be based on 1 and not 0 before dividing by rows on each section
    for (NSInteger i = 0; i < numSections; i++)
    {
        finalSection = i;
        NSInteger rows = [self tableView:self.tableView numberOfRowsInSection:i];
        if (absRow >= rows)
            absRow -= rows;
        else
        {
            finalRow = absRow;
            break;
        }
    }
    result = [NSIndexPath indexPathForRow:0 inSection:0]; // default

    if (finalSection >=0 && finalSection < numSections)
    {
//        finalRow;
        if (finalRow < [self tableView:self.tableView numberOfRowsInSection: finalSection])
            result = [NSIndexPath indexPathForRow:finalRow inSection:finalSection];
            
    }
    return result;
}

#pragma mark - Image Utilities

+ (UIImage *)imageWithColor:(UIColor *)color andSize:(CGSize)size
{
    CGRect rect = CGRectMake(0.0f, 0.0f, size.width, size.height);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
    
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
