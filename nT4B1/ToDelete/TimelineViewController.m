//
//  BrowserSwipeViewController.m
//  nT4B2
//
//  Created by Gustavo on 8/20/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "TimelineViewController.h"
#import "WebViewController.h"

@interface TimelineViewController ()

@property (nonatomic, strong) IBOutlet UIScrollView *scrollView;
@property (nonatomic, strong) IBOutlet UIScrollView *scrollView2;

@end

@implementation TimelineViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (NSMutableArray *) allocateSwipeChildControllers: (NSInteger)numberOfControllers
{
    NSMutableArray *controllers = [[NSMutableArray alloc] init];
    for (NSUInteger i = 0; i < numberOfControllers; i++)
    {
		[controllers addObject:[NSNull null]];
    }
    return controllers;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;

    
    // Set a background image to show when user goes beyond the scrollview limits
    self.view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"]];
    self.scrollView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"]];
//    self.view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"nT4B-bg-640x1136.png"]];

    // Pregnancy Topics
    self.contentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TimelinePreg" ofType:@"plist"]];
    // Prepare Pregnancy Swipe Controllers
    self.viewControllers = [self allocateSwipeChildControllers:self.contentList.count];
    self.contentLocation = @"www/topics/pregnancy";
    
    // Baby Timeline
    // Load Pregnancy Swipe Content
    self.contentList2 = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsBaby" ofType:@"plist"]];
    // Prepare Baby Swipe Controllers
    self.viewControllers2 = [self allocateSwipeChildControllers:self.contentList2.count];
    self.contentLocation2 = @"www/topics/baby";

    
    NSUInteger numberPages = self.contentList.count;
    
    // view controllers are created lazily
    // in the meantime, load the array with placeholders which will be replaced on demand
// Comment if comming from previous VC
    NSMutableArray *controllers = [[NSMutableArray alloc] init];
    for (NSUInteger i = 0; i < numberPages; i++)
    {
		[controllers addObject:[NSNull null]];
    }
    self.viewControllers = controllers;
// End comment
    CGRect frame = self.scrollView.frame;
    frame.origin.x = 0;
    frame.origin.y = 0;
    frame.size.width = 320;
    frame.size.height = 500;
    self.scrollView.frame = frame;
    
    // a page is the width of the scroll view
    self.scrollView.pagingEnabled = YES;
    self.scrollView.contentSize =
    CGSizeMake(CGRectGetWidth(self.scrollView.frame) * numberPages, 1); // Changed to 1 to fix nested UIScrollView issue (outer UIScrollView + inner UIWebView)
    //    CGSizeMake(CGRectGetWidth(self.scrollView.frame) * numberPages, CGRectGetHeight(self.scrollView.frame));
    self.scrollView.showsHorizontalScrollIndicator = NO;
    self.scrollView.showsVerticalScrollIndicator = NO;
    self.scrollView.scrollsToTop = NO;
    self.scrollView.delegate = self;
    
// No dots pagecontrol
//    self.pageControl.numberOfPages = numberPages;
//    self.pageControl.currentPage = 0;
    
    
    
    // pages are created on demand
    // load the visible page
    // load the page on either side to avoid flashes when the user starts scrolling
    [self loadScrollViewWithPage:0];
    [self loadScrollViewWithPage:1];
    [self loadScrollViewWithPage:self.PageNumber];
    [self loadScrollViewWithPage:self.PageNumber+1];
    [self loadScrollViewWithPage:self.PageNumber-1];

/*
    CGRect bounds = self.scrollView.bounds;
    
    CGPoint svorigin;
    svorigin.x = CGRectGetWidth(bounds) * self.PageNumber;
    svorigin.y = 0;
    [self.scrollView setContentOffset: svorigin animated:YES];
*/
    
	// update the scroll view to the appropriate page
    CGRect bounds = self.scrollView.bounds;
    bounds.origin.x = CGRectGetWidth(bounds) * self.PageNumber;
    bounds.origin.y = 0;
    [self.scrollView scrollRectToVisible:bounds animated:YES];

    
    self.scrollView.layer.shadowPath =  [UIBezierPath bezierPathWithRect:self.scrollView.bounds].CGPath;

    [self updateProtocol];
}


- (void)loadScrollViewWithPage:(NSUInteger)page
{
    if (page >= self.contentList.count) return;
    
    NSLog(@"loadScrollViewWithPage Page: %i", (int)page);
    // replace the placeholder if necessary
    WebViewController *controller = [self.viewControllers objectAtIndex:page];
    if ((NSNull *)controller == [NSNull null])
    {
        NSDictionary *numberItem = [self.contentList objectAtIndex:page];
        NSString* pageName = [numberItem valueForKey:@"Page"];
        NSString *pc = [numberItem valueForKey:@"Title"];

        //        controller = [[WebViewController alloc] initWithPageNumber:[self.contentList objectAtIndex:page]];
        controller = [[WebViewController alloc] initWithPage:pageName Location:self.contentLocation];
        controller.pageTitle = pc;
        //        controller.numberImage.image = [UIImage imageNamed:[numberItem valueForKey:kImageKey]];
        //        controller.numberTitle.text = [numberItem valueForKey:kNameKey];
        [self.viewControllers replaceObjectAtIndex:page withObject:controller];
    }
    
    // add the controller's view to the scroll view
    if (controller.view.superview == nil)
    {
        CGRect frame = self.scrollView.frame;
        frame.origin.x = CGRectGetWidth(frame) * page;
        frame.origin.y = 0;
        controller.view.frame = frame;
        
        [self addChildViewController:controller];
        [self.scrollView addSubview:controller.view];
        [controller didMoveToParentViewController:self];
        
    }
}

- (void)scrollViewWillBeginDecelerating:(UIScrollView *)scrollView
{
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    NSLog(@"scrollViewWillBeginDecelerating Page: %i", (int)page);

}
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
//    NSLog(@"scrollViewDidScroll Page: %i", (int)page);
    if (page < self.viewControllers.count)
//    if (page < self.numberPages)
    {
        if ([self.viewControllers objectAtIndex:page] != [NSNull null])
        {
            self.NavTitle.title = [[self.viewControllers objectAtIndex:page] pageTitle];
            [[[self.viewControllers objectAtIndex:page] genWebView]  stringByEvaluatingJavaScriptFromString:@"window.scrollTo(0.0, 0.0)"];
        }
    }
}
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    NSLog(@"scrollViewDidEndDragging Page: %i", (int)page);

    [self loadScrollViewWithPage:page - 2];
    [self loadScrollViewWithPage:page - 1];
    [self loadScrollViewWithPage:page];
    [self loadScrollViewWithPage:page + 1];
    [self loadScrollViewWithPage:page + 2];
}


// at the end of scroll animation, reset the boolean used when scrolls originate from the UIPageControl
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    // switch the indicator when more than 50% of the previous/next page is visible
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
//    self.pageControl.currentPage = page;

    NSLog(@"scrollViewDidEndDecelerating Page: %i", (int)page);
/*
    if ([self.viewControllers objectAtIndex:page] != [NSNull null])
    {
        self.NavTitle.title = [[self.viewControllers objectAtIndex:page] pageTitle];
        [[[self.viewControllers objectAtIndex:page] genWebView]  stringByEvaluatingJavaScriptFromString:@"window.scrollTo(0.0, 0.0)"];
    }
*/
    
    // load the visible page and the page on either side of it (to avoid flashes when the user starts scrolling)
/*    [self loadScrollViewWithPage:page - 1];
    [self loadScrollViewWithPage:page];
    [self loadScrollViewWithPage:page + 1];
*/
    // a possible optimization would be to unload the views+controllers which are no longer visible
}
/*
- (void)gotoPage:(BOOL)animated
{
    NSInteger page = self.pageControl.currentPage;
    
    // load the visible page and the page on either side of it (to avoid flashes when the user starts scrolling)
    [self loadScrollViewWithPage:page - 1];
    [self loadScrollViewWithPage:page];
    [self loadScrollViewWithPage:page + 1];
    
	// update the scroll view to the appropriate page
    CGRect bounds = self.scrollView.bounds;
    bounds.origin.x = CGRectGetWidth(bounds) * page;
    bounds.origin.y = 0;
    [self.scrollView scrollRectToVisible:bounds animated:animated];
}

- (IBAction)changePage:(id)sender
{
    [self gotoPage:YES];    // YES = animate
}
*/

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    NSLog(@"BrowserSwipeViewController didReceiveMemoryWarning");
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/



//*****************************************************************************************************************
//* Switch browsers between Pregnancy and New Baby based on global state (at AppDelegate level)
//* Animate the transition
//*****************************************************************************************************************
- (void)updateProtocol
{
    // *** Previous swap idea
    // [self.theWebView setHidden:TRUE];
    // [self.theWebView2 setHidden:FALSE];
    
    // *** Previous animation idea
    // [UIView beginAnimations:@"ToggleViews" context:nil];
    // [UIView setAnimationDuration:1.0];
    // Make the animatable changes.
    // self.theWebView.alpha =1.0;
    // self.theWebView2.alpha = 0.0;
    // [self.btnBaby setTitle:@"Pregnancy"];
    // Commit the changes and perform the animation.
    // [UIView commitAnimations];
    
    UIViewAnimationOptions aniType = UIViewAnimationOptionShowHideTransitionViews;
    
    if (appdelegate.t4bProtocol==1) // On Pregnancy ?
    {
        aniType += ([self.title isEqual:@"Topics"]) ? UIViewAnimationOptionTransitionFlipFromRight : UIViewAnimationOptionTransitionCurlDown;
        [self.btnBaby setTitle:@"Baby"]; // Change button to Baby
        [UIView transitionFromView: self.scrollView2
                            toView: self.scrollView
                          duration:1.0 options: aniType  completion: nil ];    //^(BOOL finished) {}
    }
    else
    {
        aniType += ([self.title isEqual:@"Topics"]) ? UIViewAnimationOptionTransitionFlipFromLeft : UIViewAnimationOptionTransitionCurlUp;
        [self.btnBaby setTitle:@"Pregnancy"];
        [UIView transitionFromView: self.scrollView
                            toView: self.scrollView2
                          duration:1.0 options: aniType  completion: nil ];
    }
}



- (IBAction)doBabyButton;
{
    [self switchProtocol];
}

- (void)switchProtocol
{
    NSLog(@"t4bprotocol: %i", (int) ((AppDelegate *)[UIApplication sharedApplication].delegate).t4bProtocol);
    
    if (appdelegate.t4bProtocol ==1) // Pregnancy ?
    {
        appdelegate.t4bProtocol = 2;
        NSLog(@"Switch from Pregnancy to Baby");
    }
    else
    {
        appdelegate.t4bProtocol = 1;
        NSLog(@"Switch from Baby to Pregnancy");
    }
    // Update UI
    [self updateProtocol];
}

@end
