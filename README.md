# dagit-playwright

## Getting identity from Chrome
- Access to `https://dev.dagit.club`.
- Go to `Inspect` (CTRL + SHIFT + I)
- Then go to `Application` tab
- In `Application` tab, click `Local storage` on a left side bar.
- You can see `https://dev.dagit.club`, and `identity` key.
- Copy `Value`
  - ex) `"MFE....."`

## Setting your identity
### Setting for a session of a terminal (Recommended)
- You need to set the `IDENTITY` whenever restarting your terminal
``` bash
    export IDENTITY="MFE..."
```
- Then, you can run `make test`

### Injection `IDENTITY` on running test
- It needs to add `IDENTITY` variable whenever executing `make test`

``` bash
    IDENTITY="MFE..." make test
```

### Persistent setting for your shell (Not Recommended)
- You can add variable `IDENTITY` to your shell rc
- The below command will add `IDENTITY` variable to your shell (`~/.bashrc` or `~/.zshrc`)

``` bash
  echo 'export IDENTITY="MFE..."' >> ~/.$(echo SHELL)rc
```
## Testing

``` bash
make test
```
