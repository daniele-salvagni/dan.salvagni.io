---
issue: 6

author: Daniele Salvagni
title: Wake On Lan using an ESP32 Telegram bot
pubDate: 'Aug 26, 2022'
emoji: 🤖

description: >
  An embeddedd ESP32 M5Atom Telegram bot for sending a Wake-on-Lan magic packet
  on the local network to turn on my PC from anywhere.
---

I wanted a simple and reliable way to turn on my PC from anywhere without having
to choose one of the following:

- **~Port Forwarding~:** As most consumer routers don't support forwarding
  broadcast packets, this would imply having to make a DHCP reservation for the
  device that needs waking up so that the local IP will not change. Also, in
  case of internet connections with dynamic IP, a DDNS service would be
  required.

- **~Local Server~:** This would require having to maintain a small local server
  like a Raspberry Pi and having it powered on 24/7. They don't consume much
  power but it's overkill and if you run them from an SD card it often gets
  corrupted.

I wanted something reliable that I could quickly setup and then mostly forget
about. The solution I came up with was to host a simple Telegram Bot on an
**ESP32** board, it will:

1. Connect to the local network via WiFI
2. Wait for the `/wol` command on Telegram
3. Broadcast the Wake-on-Lan packet on the local network

💵 The power consumption is very low, less than half a watt, so you can keep it
running for about **1$** in electricity per year without any optimization.

<video autoplay loop muted playsinline>
  <source src="/img/blog/wol/esp32-wake-on-lan.mp4" type="video/mp4" />
</video><br/>

> _It keeps working if I buy a new router, it does not depend on my public or
> local IP staying the same and I don't have to keep a linux server running for
> such a simple task._

## The sketch

I am using an ESP32 board called **M5Atom**, it is pretty small and can be
powered by USB type-c. It's a pretty simple project, so I am using the **Arduino
IDE** for ease of use.

The code should be pretty simple to understand and can be found on my Github at
https://github.com/daniele-salvagni/wol-bot-esp32

### Configuration

In orfer to compile, the following extra libraries can be installed from the
Library Manager:

- [M5Atom](https://www.arduino.cc/reference/en/libraries/m5atom/): needed for
  the M5Atom board
- [WakeOnLan](https://www.arduino.cc/reference/en/libraries/wakeonlan/): for
  sending the magic packet
- [UniversalTelegramBot](https://www.arduino.cc/reference/en/libraries/universaltelegrambot/):
  for using the Telegram API

The following configuration needs to be updated in the sketch code:

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

You just need to fill your WiFi configuration and MAC Address, your Telegram bot
token and your Telegram User ID so no one else can control the bot. You can use
[@Botfather](https://t.me/botfather) to create a new bot and
[@userinfobot](https://t.me/userinfobot) to get your ID.

### Usage

- Use `/start` to get a list of the available commands
- Use the `/wol` command or press the physical button to turn on your PC
- Use the `/ping` command to check if the bot is online

![Telegram Bot](/img/blog/wol/telegram.png)

## Enabling Wake on Lan

Most motherboards support the "Wake-on-Lan" (WOL) function. This works by
sending a packet of data called a "Magic Packet". When this packet is received
by the target macine, its network interface wakes up the rest of the computer.

The magic packet consists of the following parts:

- **Header:** 6 Bytes which is nothing but 6 bytes of 0xff.
- **Data:** 16\*6 Bytes, the MAC Address of the target device repeated 16 times.
- **Password:** Some clients require 6 extra Bytes containing a password known
  as _SecureOn_.

This feature usually needs to be enabled from **both the BIOS and the operating
system** of the PC/server you want to wake up.

Here is a screenshot of the setting in my BIOS:

![Asus ROG Strix Wake-on-Lan](/img/blog/wol/asus-rog-strix-wol.png)

To enable Wake-on-Lan on Windows you can go to _Device Manager => Network
Adapters => Properties_. Then enable _"Wake on Magic Packet"_ in the _Advanced_
tab and check _"Only allow a magic packet to wake the computer"_ in the _Power
Management tab_.

"Fast Startup" also needs to be disabled (_Power Options => "Choose what the
power buttons do"_) as it will conflict with this feature.

![Disable Fast Startup in Windows 11](/img/blog/wol/disable-fast-startup.png)

## Debugging with Wireshark

If you encounter any issues you can use Wireshark and filter for
[WOL packets](/img/blog/wol/wol-wireshark.png) to check what's going wrong.

## TODO List

- [ ] Refactor code
- [ ] Store network configuration in EEPROM
- [ ] Add configuration commands to Telegram bot
