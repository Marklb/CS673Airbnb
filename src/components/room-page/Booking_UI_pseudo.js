if (bookingtype_name = "Instant Booking") {
    Load calendar widget for check-in/check-out option to change (by default, pick the dates from filter-form last page)
    Create instant book button.
    if check-in/check-out range != range in BookedDates in HostPlaceListing {
        Allow instant book button to be clickable
    } else {
        Disallow instant book button to be clickable and inform user why
    }
} else if (bookingtype_name = "Auction") {
    //Note: Date is automatically set, this option will usually be for holidays
    Print the starting price
    Print current bid
    Print datestamp for when the auction will end
    Create a text field for $ input
    Create submit bid button.
} else if (bookingtype_name = "User-Set Response Time Frame") {
    Load calendar widget for check-in/check-out option to change (by default, pick the dates from filter-form last page)
    Create user-definable DateStamp field (perhaps Calendar widget is capable of this?) for EXPECTED response time-frame.
    Create instant book button.
    if check-in/check-out range != range in BookedDates in HostPlaceListing {
        Allow instant book button to be clickable
    } else {
        Disallow instant book button to be clickable and inform user why
    }
} else if (bookingtype_name = "Host-Set Response Time Frame") {
    Load calendar widget for check-in/check-out option to change (by default, pick the dates from filter-form last page)
    Display label for host-defined DateStamp of how long it'll take for host to get back to the user (This information is the response_time variable. Perhaps based on today's date, add this response_time to the current date i.e. 3 days later would be 11/27/2016 + 3 days = 11/30/2016 for EXPECTED response time-frame).
    Create instant book button.
    if check-in/check-out range != range in BookedDates in HostPlaceListing {
        Allow instant book button to be clickable
    } else {
        Disallow instant book button to be clickable and inform user why
    }
}
