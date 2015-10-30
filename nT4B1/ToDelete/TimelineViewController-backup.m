//
//  TimelineViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "TimelineViewController.h"
#import "BrowserViewController.h"
#import "BrowserSwipeViewController.h"


@interface TimelineViewController ()

@property (nonatomic, strong) NSMutableArray *swipeChildViewControllers; // *TopicsPregnancyViewControllers;
@property (nonatomic, strong) NSMutableArray *swipeChildViewControllers2; // *TopicsPregnancyViewControllers;
@property (nonatomic, strong) NSArray *swipeChildContentList;  //*TopicsPregnancyContentList;
@property (nonatomic, strong) NSArray *swipeChildContentList2;  //*TopicsPregnancyContentList;

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
-(void)handleLeftSwipeFrom:(UISwipeGestureRecognizer *)recognizer {
    NSLog(@"Left Swipe received.");
    if (appdelegate.t4bProtocol==1) // On Pregnancy ?
        [self.theWebView stringByEvaluatingJavaScriptFromString:@"$('.nextButton').click();"];
        else
        [self.theWebView2 stringByEvaluatingJavaScriptFromString:@"$('.nextButtonOne').click();"];
            
}
-(void)handleRightSwipeFrom:(UISwipeGestureRecognizer *)recognizer {
    NSLog(@"Right Swipe received.");
    if (appdelegate.t4bProtocol==1) // On Pregnancy ?
        [self.theWebView stringByEvaluatingJavaScriptFromString:@"$('.prevButton').click();"];
    else
        [self.theWebView2 stringByEvaluatingJavaScriptFromString:@"$('.prevButtonOne').click();"];
    
}
-(void)handleLongPress:(UISwipeGestureRecognizer *)recognizer {
    NSLog(@"Long Press received.");
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
    // Do any additional setup after loading the view.

    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    self.theWebView.delegate = self;
    self.theWebView2.delegate = self;

//    Turn off Bounce on Web
//    [[self.theWebView.subviews objectAtIndex:0] setBounces:NO];
    
    NSString *path, *path2;

    
    if ([self.title isEqual:@"Timeline"])
    {
        NSLog(@"Preparing: Timeline");
        // Pregnancy Timeline
        path = [[NSBundle mainBundle] pathForResource:@"timeline" ofType:@"html" inDirectory:@"www"]; // Works with reference to www
        // Baby Timeline
        path2 = [[NSBundle mainBundle] pathForResource:@"timelinebaby" ofType:@"html" inDirectory:@"www"]; // Works with reference to www

        UISwipeGestureRecognizer *leftRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleLeftSwipeFrom:)];
        [leftRecognizer setDirection:(UISwipeGestureRecognizerDirectionLeft)];
        [[self view] addGestureRecognizer:leftRecognizer];

        UISwipeGestureRecognizer *rightRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(handleRightSwipeFrom:)];
        [rightRecognizer setDirection:(UISwipeGestureRecognizerDirectionRight)];
        [[self view] addGestureRecognizer:rightRecognizer];

    }
    if ([self.title isEqual:@"Calendar"])
    {
        NSLog(@"Preparing: Calendar");
        // Pregnancy Timeline
        path = [[NSBundle mainBundle] pathForResource:@"pregnancy-calendar" ofType:@"html" inDirectory:@"www/calendar/pregnancy"]; // Works with reference to www
        // Baby Timeline
        path2 = [[NSBundle mainBundle] pathForResource:@"baby-calendar" ofType:@"html" inDirectory:@"www/calendar/baby"]; // Works with reference to www
    }
    if ([self.title isEqual:@"Topics"])
    {
        NSLog(@"Preparing: Topics");
        // Pregnancy Topics
        path = [[NSBundle mainBundle] pathForResource:@"pregnancy-topics" ofType:@"html" inDirectory:@"www/topics/pregnancy"];
        // Load Pregnancy Swipe Content
        self.swipeChildContentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsPregnancy" ofType:@"plist"]];
        // Prepare Pregnancy Swipe Controllers
        self.swipeChildViewControllers = [self allocateSwipeChildControllers:self.swipeChildContentList.count];

//        UILongPressGestureRecognizer *pressRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(handleLongPress)];
//        [[self view] addGestureRecognizer:pressRecognizer];
        
        // Baby Timeline
        path2 = [[NSBundle mainBundle] pathForResource:@"baby-topics" ofType:@"html" inDirectory:@"www/topics/baby"];
        // Load Pregnancy Swipe Content
        self.swipeChildContentList2 = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsBaby" ofType:@"plist"]];
        // Prepare Baby Swipe Controllers
        self.swipeChildViewControllers2 = [self allocateSwipeChildControllers:self.swipeChildContentList2.count];
    }
    NSLog(@"Pregnancy path: %@", path);
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    self.theWebView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"]];
    // Disable user selection
//    [self.theWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitUserSelect='none';"];
    // Disable callout
//    [self.theWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitTouchCallout='none';"];

    NSLog(@"New baby path2: %@", path2);
//    [self.theWebView2 loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path2]]];
    
    NSLog(@"t4bprotocol: %i", (int)appdelegate.t4bProtocol);
    [self updateProtocol];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
//    [self updateProtocol];

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
        [UIView transitionFromView: self.theWebView2
                        toView: self.theWebView
                      duration:1.0 options: aniType  completion: nil ];    //^(BOOL finished) {}
    }
    else
    {
        aniType += ([self.title isEqual:@"Topics"]) ? UIViewAnimationOptionTransitionFlipFromLeft : UIViewAnimationOptionTransitionCurlUp;
        [self.btnBaby setTitle:@"Pregnancy"];
        [UIView transitionFromView: self.theWebView
                        toView: self.theWebView2
                          duration:1.0 options: aniType  completion: nil ];
    }
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    if (navigationType == UIWebViewNavigationTypeLinkClicked )
    {

        NSArray *urlPathComponents = request.URL.pathComponents;
        NSInteger upcSize = urlPathComponents.count-1;
        // Make sure there is at least one element in the array before trying to extract the last one as the file name
        if (upcSize >= 0)
        {
            NSString *urlFileName = [urlPathComponents objectAtIndex:urlPathComponents.count-1];
            NSLog(@"Navigating to: %@", urlFileName);

            if ([self.title isEqual:@"Topics"])
            {
                BrowserSwipeViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                       instantiateViewControllerWithIdentifier:@"SwipeBrowser"];
                if (appdelegate.t4bProtocol==1) // On Pregnancy ?
                {
//                    viewController.viewControllers = self.swipeChildViewControllers;
                    viewController.contentList = self.swipeChildContentList;
                    viewController.contentLocation = @"www/topics/pregnancy";
                    viewController.PageNumber = [self LocatePage:urlFileName FromContent:self.swipeChildContentList];
                }
                else
                {
//                    viewController.viewControllers = self.swipeChildViewControllers2;
                    viewController.contentList = self.swipeChildContentList2;
                    viewController.contentLocation = @"www/topics/baby";
                    viewController.PageNumber = [self LocatePage:urlFileName FromContent:self.swipeChildContentList2];
                }
                [self.navigationController pushViewController:viewController animated:YES];
            }
            else
            {
                // Standard single browser dive
                
                 BrowserViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                 instantiateViewControllerWithIdentifier:@"BrowserVC"];
                 viewController.targetURL = request.URL;
                 [self.navigationController pushViewController:viewController animated:YES];
                
            }
            return NO;
        }
    }
    return YES;
}

-(NSInteger) LocatePage:(NSString*)page FromContent:(NSArray*)content
{
    int i;
    NSDictionary *numberItem;
    
    for (i=0; i <= content.count; i++)
    {
        if (i == content.count)
        {
            i=0; // If not found return first page
            break;
        }
        numberItem = [content objectAtIndex:i];
        if ([page isEqualToString:[numberItem valueForKey:@"Page"]]) break;
    }
    return i;
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

@end
