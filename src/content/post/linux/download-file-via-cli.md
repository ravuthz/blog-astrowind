---
title: 'Download Files via CLI on Linux'
image: '~/assets/images/wget-curl.svg'
excerpt: 'Install and using wget and curl in any Linux OS'
category: Linux
publishDate: 2021-12-22T14:24:02+07:00
tags:
  - 'Linux'
  - 'Wget'
  - 'Curl'
---

## Install wget on Linux

```bash
# On Ubuntu, Debian and Mint
sudo apt install wget -y

# On CentOS / RHEL / Fedora and Rocky Linux / AlmaLinux
sudo yum install wget -y

# On Arch Linux
sudo pacman -Sy wget

# On OpenSUSE
sudo zypper install wget
```

### Download file

```bash
wget https://curl.se/download/curl-7.79.1.tar.gz
```

### Download file with custom output

```bash
wget -O curl.tar.gz https://curl.se/download/curl-7.79.1.tar.gz
```

### Download mutiple files from file content

```bash
# download-linux.txt
https://releases.ubuntu.com/20.04.3/ubuntu-20.04.3-desktop-amd64.iso
https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.5-x86_64-dvd1.iso
https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/debian-11.2.0-amd64-DVD-1.iso
```

```bash
wget -i download-linux.txt
```

## Install curl on Linux

```bash
# On Ubuntu, Debian and Mint
sudo apt install curl -y

# On CentOS / RHEL / Fedora and Rocky Linux / AlmaLinux
sudo yum install curl -y

# On Arch Linux
sudo pacman -Sy curl

# On OpenSUSE
sudo zypper install curl
```

### Download file with curl

```bash
curl -O http://ftp.gnu.org/gnu/wget/wget2-2.0.0.tar.gz
```

### Download file with custom output

```bash
curl -o wget.tar.gz http://ftp.gnu.org/gnu/wget/wget2-2.0.0.tar.gz
```

**NOTE:**

The `-y` option used to prevent confirmation propts before installing any package.

- **wget** can download files recursively, which **curl** cannot do.
- **curl** supports more protocols than **wget**.
- **curl** can transfer data from or to a server, while **wget** can only download files.

<!-- <details open>
    <summary>Table of Contents</summary>
    <ul>
        <li><a href="#" class="active">Introduction</a></li>
        <li><a href="/2/">Body</a></li>
        <li><a href="/3/">Conclusion</a></li>
    </ul>
</details> -->
