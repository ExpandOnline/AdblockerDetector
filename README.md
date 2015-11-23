# AdblockerDetector #
The Adblocker Detector detects adblocker and privacy browser plugins. The detector always sends events to Google Analytics (GA) where the event action contains whether an ad was blocked, GA and Google Tag Manager (GTM) were loaded sucessfully. For example:

Event Category: "universal analytics on " + page URL
Event Action: "test ad loaded: false, GA loaded: true, GTM loaded: true"

Currently Event Label is not being filled, but feel free to do so.

## Requirements ##
- Server running PHP version 4 with the cURL extension enabled
- Google Analytics implementation you want to send the events to

## Implementation ##
1. Change the Tracking ID in the following line in "collectAnyway.php" to match that of your website:

		'tid' => 'UA-3638032-11', //set tracking ID here

2. Upload "advertisement.js", "collectAnyway.js" and "collectAnyway.php" to a folder on or the root of your website server.
3. Add the following two lines to the end of the <body> of your page-template:

		<script type="text/javascript" src="advertisement.js"></script>
		<script type="text/javascript" src="collectAnyway.js"></script>

## Notes ##
- If the regular GA tracker loaded succesfully, the existing client ID will be used. This means that the event hit sent by this script will be attributed to the rest of the session of the user.

## To do ##
- The current version doesn't include a way of only sending hits once per session. That should be added to make the data gathered even more useful. Currently two hits might mean two pages in two sessions or two pages in one.
- The current version recreates a complete Analytics hit (inluding for example flash version and user language), just like the tracking code would. To be able to identify factors that correlate with more or less ad or GA blocking, this is very useful. For privacy purposes, a more slimmed down version could be made that only tracks if the test ad, GA and/or GTM have been blocked without any context.
