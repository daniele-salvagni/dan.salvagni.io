---
issue: 15

author: Daniele Salvagni
title: 'Uptime monitoring for OpenWrt and Unraid'
pubDate: 'Nov 13, 2024'
emoji: 🤖

description: >
  Using Uptime Kuma with Push URL to monitor the uptime of the internet
  connectivity of OpenWrt routers and Unraid systems.
---

I have been using [Uptime Kuma](https://github.com/louislam/uptime-kuma) for
quite some to monitor some services, and I wanted to add the following health
checks:

- Internet connectivity for some isolated networks (with OpenWrt routers)
- Uptime of my Unraid server

I tend to use Push monitoring whenever I can, as it doesn't need to accept
ingress connections for private networks, and it does involve less moving parts.
The easiest way would be to setup a simple **cron** on both systems.

## OpenWrt Push Monitor

You will need **ssh** access to your OpenWrt router. If you don't, you should
generate a new key pair with the command:

```sh
ssh-keygen -t rsa
```

You can then set your public key through your router's
[LuCI](https://openwrt.org/docs/guide-user/luci/start) web interface, by
appending its content in _System → Administration_.

You will then be able to ssh as root using:

```sh
ssh -oHostKeyAlgorithms=+ssh-rsa -i '<public_key_path>' root@<router_ip>
```

With that out of the way, let's add a simple `cron` to call our Push URL every
minute. To edit your crontab, run `crontab -e` and then add the following line:

```sh
* * * * * wget --spider "https://<your_push_url>" >/dev/null 2>&1*
```

There should be a EOL character on the last line of the crontab file, just leave
an empty line at the end to be sure. Now restart the cron service in order for
the changes to take effect:

```sh
service cron restart
```

This will keep calling the Push URL every minute.

## Unraid Push Monitor

Adding a push monitor to Unraid is similar, but we will use a plugin instead of
the command line, otherwise any changes won't be persisted between reboots.

1. Install the
   [CA Uer Scripts](https://forums.unraid.net/topic/48286-plugin-ca-user-scripts/)
   plugin if you haven't already
2. Go to _Settings → User Scripts → Add New Script_
3. Edit the script by adding
   `wget --spider "https://<your_push_url>" >/dev/null 2>&1*`
4. Set the schedule as _Custom_, and type `* * * * *` to call the URL every
   minute

## Bonus: Other devices

I also wanted to monitor internet connectivity on a router which doesn't support
OpenWRT. In this case, I opted for a simple sketch I put together on a M5Atom
ESP32 device which connects to the Wi-Fi network and repeatedly call the Push
URL, and as the modem has an USB port, I am powering the ESP32 directly from
there.
