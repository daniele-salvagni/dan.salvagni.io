---
title: openwrt
---

### Allowing admin panel access from WAN port

```sh
vi /etc/config/firewall
```

Add to the end of the file:

```sh
config rule
	option name 'Allow-Admin-Wan'
	list proto 'tcp'
	option src 'wan'
	option dest_port '22 80 443'
	option target 'ACCEPT'
	option enabled 'true'
```

Restart the firewall:

```sh
/etc/init.d/firewall reload
```
