# scuffed-games.js

### A lesson in working with DOM elements.

This is a collection of games, made as a project for my Internet class at UniTBV.
The games are written in the 'vanilla' HTML/CSS/JS stack. This project is open-source and can be found at https://stealingudc.github.io/scuffed-games.js/.

### Usage

Since this is vanilla, there is nothing to compile/install/etc... If you want to deploy this on your machine and host it on the WWW (for some reason), [the npm docs](https://docs.npmjs.com/cli/v10/commands/npm-init) are your friend.

### Bugs

- The 'New Game' button actually just refreshes the page. So, the code has to be built on a little bit to allow for states and session-based stuff.
- Pressing 'BACKSPACE' when on the first character position in 'Wordle but Worse' displays an error in the console. Functionally though, it makes absolutely no difference.
- 'Wordle but Worse' sometimes picks weird words as a solution. *Tehnically* they're words that exist in the English dictionary. Practically, nobody knows about them or ever uses them.
- There's no character limit on 'Form Fighters'. (Is this really an issue?).
- To be continued...

If you care about these, you could make a [pull request](https://github.com/stealingudc/scuffed-games.js/pulls). Help is always greatly appreciated.

### License

[MIT License](https://choosealicense.com/licenses/mit/#suggest-this-license), I suppose. You can do anything you want with this, really. I don't mind.
