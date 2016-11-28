if (bookButton is hit) {

    if (bookingtype_name = "Instant Booking") {
        INSERT INTO Reservation (
        place_id, host_id, client_id, payment_type_id, date_range, amt_paid, paid_date
        ) VALUES (
        '" + place_id + "', '" + host_id + "', '" + client_id + "', '" + payment_type_id + "', '" + date_range + "', '" + amt_paid + "', '" + paid_date + "'
        );
        UPDATE HostPlaceListing
        SET active = 'No', booked_dates = '" + booked_dates + "'
        WHERE place_id = '" + place_id + "';

    } else if (bookingtype_name = "Auction") {
        INSERT INTO ClientAuctionBids (
        auction_id, client_id, bid_price
        ) VALUES (
        '" + auctionID + "', '" + client_id + "', '" + bid_price + "'
        );
        AND
        UPDATE Auction
        SET current_price = '" + current_price + "''
        WHERE place_id = '" + place_id + "' AND (SELECT DATEDIFF(end_auction_time, '" + todays date + "') >= 0;


    } else if (bookingtype_name = "User-Set Response Time Frame") {
        INSERT INTO ClientPlaceRequest (client_id, place_id, resp_time, date_start, date_end, date_req, status) VALUES ('" + client_id + "', '" + place_id + "', '" + resp_time + "', '" + date_start + "', '" + date_start + "', '" + date_end + '", waiting);


    } else if (bookingtype_name = "Host-Set Response Time Frame") {
        INSERT INTO ClientPlaceRequest (client_id, place_id, resp_time, date_start, date_end, date_req, status) VALUES ('" + client_id + "', '" + place_id + "', '" + resp_time + "', '" + date_start + "', '" + date_start + "', '" + date_end + '", 'waiting');
    }
    Take to new page?
}
