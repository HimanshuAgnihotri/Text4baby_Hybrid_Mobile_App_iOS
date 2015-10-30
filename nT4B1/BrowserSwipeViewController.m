//
//  BrowserSwipeViewController.m
//  nT4B2
//
//  Created by Gustavo on 8/20/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "BrowserSwipeViewController.h"
#import "WebViewController.h"
#import "WeekTableViewController.h"
#import "MainTabBarController.h"
#import "SwapViewController.h"

@interface BrowserSwipeViewController ()
{
    // To align expanded sections and browser scrolling from top
    BOOL applyOnce; // Used to apply state of current page only once during the multiple events triggered during horizontal scrolling
    NSInteger browserTopScroll; // Last known vertical scrolling position of a browser
    NSInteger prevScrollPage; // Previous scroll position. Usted to later determine horizontal scrolling direction
    NSInteger scrollDirection; // Stores horizontal scroll direction
    NSInteger expandedSection; // Last known expanded section if page contains accordions
    
    NSInteger pageNumber;
    UIEdgeInsets insets1; // Insets for UIWebView and its scrollview. They are re-ajusted if scrollview is shifted up to hide welcome
    UILabel *lblWelcome;  // reference to welcome back label (built dynamically)
    BOOL mustHideWelcome; // Simple boolean to evaluate if welcome label must be hidden
    
}
@property (nonatomic, strong) IBOutlet UIScrollView *scrollView;

@end

@implementation BrowserSwipeViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}
- (void)viewDidLoad
{
    [super viewDidLoad];
    NSLog(@"BrowserSwipeViewController viewDidLoad");
    currecntSelectedWeek = -1;

    insets1 = UIEdgeInsetsMake ( 48, 0, 40, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
    
//    [self weekBarSetupAndWelcome]; // Prepare Week Navigation Bar. Show Welcome Back if necessary. Hide bar for Topics.
    
    // Background visible when attempting scroll beyond page limits. Image scaled to view's size
    [Support setBackgroundForView: self.view];
    self.scrollView.backgroundColor = [UIColor clearColor];
    
    NSUInteger numberPages = self.contentList.count;
    browserTopScroll = 0; //Default browser position for vertical scrolling
    prevScrollPage = -1;
    expandedSection = 0;
    applyOnce = false;

    // view controllers are created lazily
    // in the meantime, load the array with placeholders which will be replaced on demand

    NSMutableArray *controllers = [[NSMutableArray alloc] init];
    for (NSUInteger i = 0; i < numberPages; i++) [controllers addObject:[NSNull null]];
    self.viewControllers = controllers;

    // a page is the width of the scroll view
    self.scrollView.pagingEnabled = YES;
    self.scrollView.contentSize =
    CGSizeMake(CGRectGetWidth(self.scrollView.frame) * numberPages, 1); // Changed to 1 to fix nested UIScrollView issue (outer UIScrollView + inner UIWebView)
    //    CGSizeMake(CGRectGetWidth(self.scrollView.frame) * numberPages, CGRectGetHeight(self.scrollView.frame));
    self.scrollView.showsHorizontalScrollIndicator = NO;
    self.scrollView.showsVerticalScrollIndicator = NO;
    self.scrollView.scrollsToTop = NO;
    self.scrollView.delegate = self;
    
//    self.scrollView.layer.shadowPath =  [UIBezierPath bezierPathWithRect:self.scrollView.bounds].CGPath;
}
- (void) viewWillAppear:(BOOL)animated
{
    self.view.frame = self.parentViewController.view.bounds;
}

#pragma mark - Week Navigation Bar

// Prepare Week Navigation Bar. Show Welcome Back if necessary. Hide bar for Topics.
- (void)weekBarSetupAndWelcome
{
    mustHideWelcome = NO; // Assume there is no welcome label to hide by default
    if (self.hasWeekNav)
    {
        self.viewNav.hidden = NO;
        if (self.showWelcomeTitle)
        {
            lblWelcome = [[UILabel alloc] initWithFrame: self.viewNav.frame];
            NSString *welcome = [NSString stringWithFormat:@"Hi %@, Welcome Back!", self.userFirstName];
            [lblWelcome setText: welcome];
            [lblWelcome setFont:[UIFont fontWithName:@"VAGRoundedStd-Light" size:20.0]];
            [lblWelcome setTextAlignment:NSTextAlignmentCenter];
            [lblWelcome setAdjustsFontSizeToFitWidth:YES];
            [self.view addSubview:lblWelcome];
            lblWelcome.alpha = 1.0;
            lblWelcome.userInteractionEnabled = YES;
            UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(labelTap)];
            [lblWelcome addGestureRecognizer:tapGesture];
            self.btnNext.alpha = 0.0;
            self.btnPrev.alpha = 0.0;
            self.btnWeek.alpha = 0.0;
            mustHideWelcome = YES;
            [NSTimer scheduledTimerWithTimeInterval:10.0
                                             target:self
                                           selector:@selector(onHideWelcomeTick:)
                                           userInfo:nil
                                            repeats:NO];
        }
    }
    else
    {
        self.viewNav.hidden = YES;
    }
}
-(void) labelTap
{
    [self hideWelcome];
}

// Called by timer once welcome message must be removed
-(void)onHideWelcomeTick:(NSTimer *)timer {
    if (mustHideWelcome) [self hideWelcome];
}
// Hide "Hi <name>, Welcome Back!" message on timeline week bar
- (void) hideWelcome
{
    [UIView animateWithDuration:0.5
                     animations:^{
                         lblWelcome.alpha = 0.0;
                         self.btnNext.alpha = 1.0;
                         self.btnPrev.alpha = 1.0;
                         self.btnWeek.alpha = 1.0;
                     } completion:nil
     ];
    mustHideWelcome = NO;
}
- (IBAction)doPrev
{
    [self prevPage];
}
- (IBAction)doNext
{
    [self nextPage];
}

- (IBAction)doWeekSelection
{
    // Update last know webpage state before jumping to a new page
    [self updateLastKnownStateForPage: [self getPageNumber]];
    
    //NSLog(@"%s userWeek:%li GetPageNumber:%li,AND currecntSelectedWeek:%li",__PRETTY_FUNCTION__,(long)self.userWeek,(long)[self getPageNumber],(long)currecntSelectedWeek);
    // Prepare Navigation Controller in front of WeekSelection
    UINavigationController *nc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"WeekSelection"];
    nc.modalPresentationStyle = UIModalPresentationFullScreen + UIModalPresentationOverFullScreen;
    nc.modalTransitionStyle  = UIModalTransitionStyleCoverVertical;
    
    WeekTableViewController *vc = (WeekTableViewController*) [nc.viewControllers objectAtIndex:0];
    // Prepare WeekSelection table view
    vc.weekDelegate = self;
    vc.weekList = self.contentList;
    vc.weekImageLocation = self.imageLocation;
    vc.currentWeek = [self getPageNumber];
    vc.weekOffset = self.weekOffset;
    //By me
    if (currecntSelectedWeek != [self getPageNumber]) {
         vc.userWeek = [self getPageNumber];
         //NSLog(@"MatchNotFound:currecntSelectedWeek:%li",(long)currecntSelectedWeek);
    }
    else
    {
         vc.userWeek = self.userWeek;
        // NSLog(@"MatchFound:currecntSelectedWeek:%li",(long)currecntSelectedWeek);
    }
    self.userWeek = vc.userWeek;//In case of Not Match
    //vc.userWeek = self.userWeek;

    MainTabBarController *tb = (MainTabBarController *) self.tabBarController;
    vc.forCurrentProtocol = (tb.visibleProtocol == tb.userT4bProtocol);
    
    // Display the WeekList on full screen from root view (not using self present... to prevent display under nav/tab bars
    UIWindow *topWindow = [[UIApplication sharedApplication] keyWindow];
    UINavigationController *rootView = (UINavigationController *)[topWindow rootViewController];
    [rootView presentViewController:nc animated:YES completion:nil];
}

- (void) updateWeekArrowsForPage: (NSUInteger) page
{
    self.btnPrev.alpha = (page == 0 ? 0.15 : 1);
    self.btnNext.alpha = (page == self.contentList.count-1 ? 0.15 : 1);
}


#pragma mark - SwapViewController Protocol
// Mandatory for all ViewControllers inlcuded in a SwapViewController.
- (void) viewRefresh
{
    // No need to implement if there is nothing to refresh
}
- (void) switchEvent: (T4bProtocols) newProtocol;
{
    NSString *js, *result;
    NSUInteger page = [self getPageNumber];
    currecntSelectedWeek = page;
    NSLog(@"switchEvent -> newProtocolo: %u", (int)newProtocol);
    // Call updateResults in case new badges were added so that they are reflected on new protocol
    if (newProtocol == T4bProtocolPregnancy)
        js = [NSString stringWithFormat:@"updateResults(%i);", (int)(page + self.weekOffset)];
    else
        js = [NSString stringWithFormat:@"updateResultsBaby(%i);", (int)(page + self.weekOffset)];
//    if ( [[self.viewControllers objectAtIndex:page] theWebView] != nil)
    if ( [self.viewControllers objectAtIndex:page] != [NSNull null])
        result = [[[self.viewControllers objectAtIndex:page] theWebView]  stringByEvaluatingJavaScriptFromString:js];
    else
        NSLog(@"Browser for page %u is NIL (%u protocol)", (int)page, (int)newProtocol);
}

#pragma mark - WeekSelection Delegate

- (void) updateWeekSelection:(NSUInteger) selectedWeekIndex
{
    currecntSelectedWeek = selectedWeekIndex;
        [self setPageTo:selectedWeekIndex];
   // NSLog(@"updateWeekSelection:currecntSelectedWeek:%li",(long)currecntSelectedWeek);
}
- (void) gotoHomeWeek
{
    MainTabBarController *tb = (MainTabBarController *) self.tabBarController;
    SwapViewController* svc = (SwapViewController *)self.parentViewController;
    BrowserSwipeViewController *bsvc;

    // Switch protocol if necessary
    if (tb.visibleProtocol != tb.userT4bProtocol)
        [svc switchProtocol];

    // Go to the home page for user's protocol
    if (tb.userT4bProtocol==T4bProtocolPregnancy)
    {
        bsvc = (BrowserSwipeViewController *) (svc.vc1);
        [bsvc setPageTo:tb.userWeek-4];
        //currecntSelectedWeek = tb.userWeek-4;
    }
    if (tb.userT4bProtocol==T4bProtocolNewBaby)
    {
        bsvc = (BrowserSwipeViewController *) (svc.vc2);
        [bsvc setPageTo:tb.userWeek-1];//by me:-1
         //currecntSelectedWeek = tb.userWeek;
    }
    NSLog(@"protocol %lu", (unsigned long)tb.userT4bProtocol);
    NSLog(@"FName %@", tb.userFirstName);
    NSLog(@"UserWeek %li", (long)tb.userWeek);
}

#pragma mark - Navigation Functions

- (void)nextPage
{
    NSInteger page = [self getPageNumber];
    //NSLog(@"Before Value:self.userWeek:%li",(long)self.userWeek);
    [self updateLastKnownStateForPage: page];
    //NSLog(@"After Value:self.userWeek:%li",(long)self.userWeek);
    if (page+1 < self.contentList.count)//self.contentList.count = 39
        [self setPageTo: ++page]; // Increase page number and set new page
    currecntSelectedWeek = page;
}
- (void)prevPage
{
    NSInteger page = [self getPageNumber];
    [self updateLastKnownStateForPage: page];
    if (page-1 >= 0)
        [self setPageTo: --page]; // Decrease page number and set new page
    
    currecntSelectedWeek = page;
}
- (void)setPageTo:(NSInteger)page
{
    //NSLog(@"Before2 Value:self.userWeek:%li",(long)self.userWeek);
    [self view];
   // NSLog(@"setPageTo: %i", (int)page);
    pageNumber = page;
    
    // pages are created on demand
    [self loadScrollViewWithPage:pageNumber];   // load the visible page

    // Load pages on either side to avoid flashes when the user starts scrolling
    [self loadScrollViewWithPage:pageNumber+1];
    [self loadScrollViewWithPage:pageNumber+2];
    [self loadScrollViewWithPage:pageNumber-1];
    [self loadScrollViewWithPage:pageNumber-2];

    // Remove any other view controller to save memory. User might move randomly among weeks
    for (NSInteger i=0; i<self.contentList.count; i++)
    {
        if (i< page-2 || i > page+2) [self removeScrollViewWithPage:i];
    }

    // update the scroll view to the appropriate page
    CGRect bounds = self.scrollView.bounds;
    bounds.origin.x = CGRectGetWidth(bounds) * pageNumber;
    bounds.origin.y = 0;
    [self.scrollView scrollRectToVisible:bounds animated:YES];
    if (self.hasWeekNav)
    {
        [self.btnWeek setTitle: [self getLabelForWeek:page] forState:UIControlStateNormal];
    }
    [self prepareNextDisplayPage: page];
    [self updateWeekArrowsForPage:page]; // Evaluate if arrows should be enabled
    //NSLog(@"After2 Value:self.userWeek:%li",(long)self.userWeek);
}

- (void)loadScrollViewWithPage:(NSUInteger)page
{
    if (page >= self.contentList.count) return;
    
    //NSLog(@"loadScrollViewWithPage Page: %i", (int)page);
    // replace the placeholder if necessary
    
    WebViewController *controller = [self.viewControllers objectAtIndex:page];
    if ((NSNull *)controller == [NSNull null])
    {
        NSDictionary *numberItem = [self.contentList objectAtIndex:page];
        NSString* pageName = [numberItem valueForKey:@"Page"];
        NSString *pc = [numberItem valueForKey:@"Title"];

        controller = [[WebViewController alloc] initWithPage:pageName Location:self.contentLocation];
        controller.week = page;
        controller.pageTitle = pc;
        controller.parentController = self;
        [self.viewControllers replaceObjectAtIndex:page withObject:controller];
    }
    
    // add the controller's view to the scroll view
    if (controller.view.superview == nil)
    {
        [self.scrollView addSubview:controller.view];
        [controller view];  // Attempt to avoid seeing background (Because there is a controller but the view is not generated)

        CGRect frame = self.scrollView.frame;
        frame.origin.x = CGRectGetWidth(frame) * page;
        controller.view.frame = frame;
//        [self addChildViewController:controller];      // Not necessary and prevents releasing memory from individual view controllers
        [controller didMoveToParentViewController:self];
    }
}
- (void)removeScrollViewWithPage:(NSUInteger)page
{
    NSLog(@"removeScrollViewWithPage Page: %i", (int)page);
    if (page >= self.contentList.count) return;

    if ([self.viewControllers objectAtIndex:page] != [NSNull null])
    {
        WebViewController *controller = [self.viewControllers objectAtIndex:page];

//      Releasing only the views
//        controller.view = nil;
//        return;
        
//      Releasing view controllers (and their views) frees up some more memory with no visible difference when rebuilding the viewcontroller
        [controller.theWebView stopLoading];
        controller.theWebView.delegate = nil;
//        [[controller view] removeFromSuperview];
        controller.theWebView = nil;
        controller.view = nil;
        [self.viewControllers replaceObjectAtIndex:page withObject: [NSNull null]];
    }
}

#pragma mark - Scrollview Delegate

- (void)scrollViewWillBeginDecelerating:(UIScrollView *)scrollView
{
    NSUInteger page = [self getPageNumber];
    NSLog(@"scrollViewWillBeginDecelerating Page: %i", (int)page);
}

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    NSUInteger page = [self getPageNumber];
    NSLog(@"*** scrollViewWillBeginDragging Page: %i ***", (int)page);

    applyOnce = true; // Enable updating last known state to the next page
    // read state of current web page and upload last known values to be ready for next page
    [self updateLastKnownStateForPage: page];
    if (mustHideWelcome) [self hideWelcome];
}
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    NSUInteger page = [self getPageNumber];
    [self.btnWeek setTitle: [self getLabelForWeek:page] forState:UIControlStateNormal];
    // Update Topics Title Bar
    if (page < self.viewControllers.count)
    {
        if ([self.viewControllers objectAtIndex:page] != [NSNull null])
        {
            self.NavTitle.title = [[self.viewControllers objectAtIndex:page] pageTitle];
        }
    }
    if (applyOnce)
    {
        scrollDirection = 0; // Default to not moving on any direction
        NSLog(@"scrollViewDidScroll to: %li", (long)self.scrollView.contentOffset.x);
        if (self.scrollView.contentOffset.x > prevScrollPage) scrollDirection = 1;
        if (self.scrollView.contentOffset.x < prevScrollPage) scrollDirection = -1;
        [self prepareNextDisplayPage: page + scrollDirection];
        currecntSelectedWeek = page + scrollDirection;
        applyOnce = false;
    }
    prevScrollPage = self.scrollView.contentOffset.x;
}
- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    NSUInteger page = [self getPageNumber];
    NSLog(@"scrollViewDidEndDragging Page: %i", (int)page);
    
    if (page >= self.contentList.count) return;

    [self loadScrollViewWithPage:page];
    [self loadScrollViewWithPage:page + (scrollDirection)];
    [self loadScrollViewWithPage:page + (scrollDirection * 2)];
    [self loadScrollViewWithPage:page + (scrollDirection * 3)];
    [self loadScrollViewWithPage:page + (scrollDirection * 4)];
    pageNumber = page;
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    NSUInteger page = [self getPageNumber];
    NSLog(@"scrollViewDidEndDecelerating Page: %i", (int)page);

    [self loadScrollViewWithPage:page + (scrollDirection * 2)];
    [self loadScrollViewWithPage:page + (scrollDirection * 3)];
    [self loadScrollViewWithPage:page + (scrollDirection * 4)];
    
    
    [self removeScrollViewWithPage:page + (scrollDirection * -3)]; // Clear pages left behind. Do 2 in case 1 is skipped
    [self removeScrollViewWithPage:page + (scrollDirection * -4)];

    [self updateWeekArrowsForPage:page]; // Evaluate if arrows should be enabled
}

- (void)updateLastKnownStateForPage:(NSUInteger) page
{
    if (page<self.contentList.count) // If currently loaded it should be true, but just let's make sure
    {
        if ([self.viewControllers objectAtIndex:page] != [NSNull null])  // Make sure there is a viewcontroller before making any call
        {
            // Only if this is a fully loaded page, try to update the current vertical scroll position
            if ([[self.viewControllers objectAtIndex:page] completedLoading])
            {
                NSString *js, *result;
                // If there are accordions, inspect currently open to expand to be ready for next page
                if (self.hasAccordions)
                {
                    // Scan all accordions looking for one WITHOUT the collapsed class using jQuery
                    expandedSection = 0;
                    for (NSInteger i=1; i<=3; i++)
                    {
                        // Prepare and execute JS
                        js = [NSString stringWithFormat:@"$('#%@%li').hasClass('ui-collapsible-collapsed')", self.t4bBlockPrefix, (long)i];
                        result = [[[self.viewControllers objectAtIndex:page] theWebView]  stringByEvaluatingJavaScriptFromString:js];
                        // If an accordion doesn't have the collapsed class, keep it as the last known accordion state
                        if ([result isEqualToString:@"false"]) expandedSection = i;
                    }
                    NSLog(@"Expand state: %li", (long)expandedSection);
                }
                // Now get the vertical scroll position for current web browser
                NSString *x = [[[self.viewControllers objectAtIndex:page] theWebView] stringByEvaluatingJavaScriptFromString:@"document.body.scrollTop;"];
                browserTopScroll = [x intValue];
                NSLog(@"document.body.scrollTop: %@", x);
            }
        }
    }
}
- (void)prepareNextDisplayPage: (NSUInteger) nextPage
{
//    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
//    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
//    NSUInteger nextPage = page + offset;
    
    NSLog(@"prepareNextDisplayPage Page: %i", (int)nextPage);
    // Check current page and next pages are within range. Not checking >0 as unsigned integer
    if ( nextPage < self.viewControllers.count)
    {
        if ([self.viewControllers objectAtIndex:nextPage] != [NSNull null])
        {
            NSString *js, *result;
            // If there are accordions, try to expand accordion for next page
            if (self.hasAccordions)
            {
                js = [self buildJSforAccordionAlignment];
                NSLog(@"Expand JS-> %@", js);
                result = [[[self.viewControllers objectAtIndex:nextPage] theWebView]  stringByEvaluatingJavaScriptFromString:js];
                if (self.vcProtocol == T4bProtocolPregnancy)
                    js = [NSString stringWithFormat:@"updateResults(%i);", (int)(nextPage + self.weekOffset)];
                else
                    js = [NSString stringWithFormat:@"updateResultsBaby(%i);", (int)(nextPage + self.weekOffset)];
                result = [[[self.viewControllers objectAtIndex:nextPage] theWebView]  stringByEvaluatingJavaScriptFromString:js];
/*                js = [NSString stringWithFormat:@"setTimeout(updateResults(%u), 100);", nextPage + self.weekOffset];
                result = [[[self.viewControllers objectAtIndex:nextPage] theWebView]  stringByEvaluatingJavaScriptFromString:js];
                js = [NSString stringWithFormat:@"setTimeout(updateResults(%u), 100);", nextPage + self.weekOffset + 1];
                result = [[[self.viewControllers objectAtIndex:nextPage] theWebView]  stringByEvaluatingJavaScriptFromString:js];
 */
 }
            // Align next web browser vertical scroll position
            js = [self buildJSforVerticalAlignment]; // Generates JS to insert for vertical alignment using internally last know vertical position
            NSLog(@"Vertical Align JS-> %@", js);
            result = [[[self.viewControllers objectAtIndex:nextPage] theWebView] stringByEvaluatingJavaScriptFromString: js];
        }
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    NSLog(@"********** BrowserSwipeViewController didReceiveMemoryWarning **********");
    [[NSURLCache sharedURLCache] removeAllCachedResponses];

    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;

    for (int i=0; i < self.viewControllers.count; i++)
    {
        if (i != page)
        if (i < page-1 || i > page+1)
        {
            WebViewController *controller = [self.viewControllers objectAtIndex:i];
            if ((NSNull *)controller != [NSNull null]) controller.view = nil;
        }
    }
}


#pragma mark - Support Functions

- (NSUInteger) getPageNumber
{
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    return page;
}

- (NSString *)getLabelForWeek: (NSInteger) page
{
    if (page >= self.contentList.count) page = self.contentList.count-1; // Prevent reaching an invalid page/week number if swiping past half of last page
    NSString *s = [NSString stringWithFormat:@"Week %li", (long)page + self.weekOffset];
    return s;
}

// Generates JS to insert for vertical alignment using internally last know vertical position
- (NSString *) buildJSforVerticalAlignment
{
    return [NSString stringWithFormat:@"setTimeout(window.scrollTo(0,%li),100);", (long)browserTopScroll];
}

// Generates JS to expand an accordion using internally last know accordion state
- (NSString *) buildJSforAccordionAlignment
{
    if (expandedSection==0)
    return [NSString stringWithFormat:@"$('#%@1').trigger('collapse');$('#%@2').trigger('collapse');$('#%@3').trigger('collapse');", self.t4bBlockPrefix, self.t4bBlockPrefix, self.t4bBlockPrefix];
    else
    return [NSString stringWithFormat:@"$('#%@%li').trigger('expand');", self.t4bBlockPrefix, (long)expandedSection];
}

@end
