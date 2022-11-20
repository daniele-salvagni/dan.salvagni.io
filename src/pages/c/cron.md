---
layout: '../../layouts/CodeSnippet.astro'
title: cron
---

```bash
# Min  Hour Day  Mon  Weekday
  *    *    *    *    *  command to be executed
# ┬    ┬    ┬    ┬    ┬
# │    │    │    │    └─  Weekday  (0=Sun .. 6=Sat)
# │    │    │    └──────  Month    (1..12)
# │    │    └───────────  Day      (1..31)
# │    └────────────────  Hour     (0..23)
# └─────────────────────  Minute   (0..59)

echo "@reboot echo hi" | crontab  # adding tasks
crontab -e                        # open in editor
crontab -l [-u user]              # list tasks
```

### Operators

```bash
*  # all values
,  # separate individual values
-  # a range of values
/  # divida a value into steps
```

### Examples

```bash
0 * * * *       # every hour
*/15 * * * *    # every 15 mins
0 */2 * * *     # every 2 hours
0 18 * * 0-6    # every week Mon-Sat at 6pm
10 2 * * 6,7    # every Sat and Sun on 2:10am
0 0 * * 0       # every Sunday midnight
@reboot         # every reboot
```
