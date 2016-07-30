# ftp deployer

sync gitbook to ftp server after each build

not work yet. I do not know why.

## Install

```
$ npm install gitbook-plugin-ftpsync --save
```

## Config `book.json`

```js
{
    plugins: ["ftpsync"],
    pluginsConfig: {
        "ftpsync": {
            "host": "xxx.org",
            "port": "21",
            "user": "usr_name",                              
            "pass": "ftp_password",                                 
            "remote": "/domains/xxx.org/public_html/"
        } 
    }
}
```

## Caution

since the usr/password of your ftp is saved in `book.json`, you need keep your `book.json` in private.
