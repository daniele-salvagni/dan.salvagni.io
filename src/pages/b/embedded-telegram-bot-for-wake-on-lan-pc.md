---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 6

author: Daniele Salvagni
title: Wake On Lan using an ESP32 Telegram bot
publishDate: 2022-08-26

excerpt:
  An embeddedd ESP32 M5Atom Telegram bot for sending a Wake-on-Lan magic packet
  on the local network to turn on my PC from anywhere.
---

I wanted a simple way to be able to turn on my PC from anywhere without having
to choose one of the following:

- **Port Forwarding:** As most consumer routers don't support forwarding
  broadcast packets, this would imply having to make a DHCP reservation for the
  device that needs waking up so that the local IP will not change. Also, in
  case of internet connections with dynamic IP, a DDNS service would be
  required.
- **Local Server:** This would require having to maintain a small local server
  like a Raspberry Pi and having it powered on 24/7. They don't consume _that
  much_ power but if you run them from an SD card it often gets corrupted.

<video autoplay loop muted playsinline>
  <source src="/assets/img/content/004/esp32-wake-on-lan.mp4" type="video/mp4" />
</video><br/>

I wanted something reliable that I could quickly setup and then mostly forget
about it. The solution I came up with was to host a simple Telegram Bot on an
**ESP32** board. The power consumption is very low (less than 0.5W) and it will:

1. Connect to the local network via WiFI
2. Wait for the `/wol` command on Telegram
3. Broadcast the Wake-on-Lan packet on the local network

It keeps working if I buy a new router, it does not depend on my public or local
IP staying the same and I don't have to keep a linux server running for such a
simple task.

## The Wake on Lan "Magic Packet"

Most motherboards support the "Wake-on-Lan" (WOL) function. This works by
sending a packet of data called a "Magic Packet". When this packet is received
by the target macine, its network interface wakes up the rest of the computer.

The magic packet consists of the following parts:

- **Header:** 6 Bytes which is nothing but 6 bytes of 0xff.
- **Data:** 16\*6 Bytes, the MAC Address of the target device repeated 16 times.

Some clients require a password in the packet known as **SecureOn** and it will
be attached at the end.

```
FF FF FF FF FF FF |    Mac Address    |    Mac Address    |    Mac Address
   Mac Address    |    Mac Address    |    Mac Address    |    Mac Address
   Mac Address    |    Mac Address    |    Mac Address    |    Mac Address
   Mac Address    |    Mac Address    |    Mac Address    |    Mac Address
   Mac Address    |     Password      |
```

This feature usually needs to be enabled from both the BIOS _and_ the operating
system of the PC you want to wake up.  
Here is a screenshot from my BIOS:

![Asus ROG Strix Wake-on-Lan](/assets/img/content/004/asus-rog-strix-wol.png)

To **enable Wake-on-Lan on Windows** you can go to _Device Manager => Network
Adapters => Properties_. Then enable _"Wake on Magic Packet"_ in the _Advanced_
tab and check _"Only allow a magic packet to wake the computer"_ in the _Power
Management tab_.

**Fast Startup** also needs to be disabled (_Power Options => "Choose what the
power buttons do"_).

![Disable Fast Startup in Windows 11](/assets/img/content/004/disable-fast-startup.png)

## The sketch

I am using an ESP32 board called **M5Atom**, it is pretty small and can be
powered by USB type-c. It's a pretty simple project, so I am using the **Arduino
IDE** for ease of use.

The code with setup instructions can be find on my Github at:
https://github.com/daniele-salvagni/wol-bot-esp32

```cpp
// WiFi configuration
#define WIFI_SSID "<wifi-network-name>"
#define WIFI_PASS "<wifi-password>"

// MAC address of the target device
#define MAC_ADDR "00:00:00:00:00:00"

// Telegram Bot Token
#define BOT_TOKEN  "<telegram-bot-token-id>"
#define ALLOWED_ID "<id-for-the-allowed-user>"
```

You just need to input your WiFi configuration and MAC Address, your Telegram
bot token and your telegram user ID so no one else can use the bot. You can use
[@Botfather](https://t.me/botfather) to create a new bot and
[@userinfobot](https://t.me/userinfobot) to get your ID.

The following extra libraries can be installed from the Library Manager:

- [M5Atom](https://www.arduino.cc/reference/en/libraries/m5atom/): needed to use
  some features of the M5Atom
- [WakeOnLan](https://www.arduino.cc/reference/en/libraries/wakeonlan/): for
  sending the magic packet
- [UniversalTelegramBot](https://www.arduino.cc/reference/en/libraries/universaltelegrambot/):
  for using the Telegram API

**TODO:** refactor the code and create a local webserver to change and store the
configuration in the EEPROM without having to recompile.
