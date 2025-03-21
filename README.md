This is P.A. Grammo's code, directly engraved onto his magical records (GitHub)! 
To be used exclusively by the citizens of Fortis Castellum. Please let me know if you find any bugs- they itch :)

Current functionality:

- Updates time channel name with the server time.
- Backup dice roller.
- Automated and configurable weather reports!
- More to come! ... maybe...

Commands:  
- **!pa dice `<dice roll>` `<modifier>`**:  Rolls dice roll specified by <dice roll>, adds <modifier>. Default roll is 1d6 and default modifier is +0.
- **!pa weather**: Views weather forecast for the coming week (Day 0 corresponds to Sunday, Day 1 corresponds to Monday, etc.)
- **!pa weather edit `<day>` `<season>` `<weather>`**: Edits the weather for a particular day. `<day>` must be a number between 0 and 6. `<season>` must be one of: spring, summer, autumn, winter.  `<weather>` must correspond to the weather name. No quotations, just do spaces in between words.
- **!pa weather resend**: Resends today's weather, to be used after edits.
- **!pa weather reroll**: Rerolls the week's weather! 
