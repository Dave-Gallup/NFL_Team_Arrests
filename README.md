# Q1 Project - NFL Team arrests

This is a website which accesses a remote API (nflarrest.com) and displays data regarding a given team's player arrest records since 2000.

## User experience

The user begins by entering a team of their choice.  The site will start with a dropdown listing all current NFL teams as well as a carousel of team logos.  The user is able to select a team by manipulating either one of these and the corresponding choice will be reflected in the other.  That is, if they spin through the logos, the dropdown will change along with it and, conversely, if the dropdown selection is changed, the logos will change to match.  Once the team is chosen, the user clicks on the submit button.

The team summary page is then displayed.  This shows the team logo and name.  It then displays a bar chart showing the number of arrests of team members since 2000.  Beneath this, there is a list of all players who have been arrested as well as a donut chart showing the breakdown of crime categories of which these arrests are comprised.

Clicking on a player from the list will pull up a new display containing all arrests for that player, regardless of which team he was on when the arrest was made.  Each arrest is shown on a separate card along with the team logo of the team on which the player played when the arrest was made.

Finally, the user may also click on the "All NFL" button in the navigation bar to display a line chart of all 32 NFL teams' arrest counts over the last 17 years.

## What I learned

In this project, I made use of a number of technologies new to me.  These included jQuery and Javascript Promises as well as a couple front-end frameworks (UIKit and Materialize).  This was also the first time I have interacted with an API.  I feel I have a better understanding of promises as a result of this experience.

I did learn that UIKit isn't something I'll likely use again in product design since it didn't seem to work the way it said it would.  I found Materialize to be better suited for my purposes.