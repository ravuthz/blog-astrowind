---
title: 'SSH Key'
image: '~/assets/images/ssh-key.svg'
excerpt: 'Generate SSH key and use it to connect to remote server'
category: Linux, SSH
publishDate: 2024-08-25T04:26:00+07:00
tags:
  - 'Linux'
  - 'SSH'
---

## List SSH key

```bash
ls -lah ~/.ssh

cat ~/.ssh/known_hosts
cat ~/.ssh/authorized_keys
```

## Generate SSH key

Command to generate RSA, DSA, ECDSA and Ed25519 key

```bash
ssh-keygen -t rsa -b 4096
ssh-keygen -t dsa
ssh-keygen -t ecdsa -b 521
ssh-keygen -t ed25519
```

NOTE:

- The **-t** option specifies the type of key to generate.
- The **-b** option specifies the key size in bits. The default key size is **2048** bits.
- The **-C** option specifies the comment for the key.

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## Copy SSH key to remote server

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@remote_server
```

## Copy SSH key to multiple remote server

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user1@remote_server1 user2@remote_server2
```

## Open and Copy SSH key to clipboard

```bash
# On MacOS
tr -d '\n' < ~/.ssh/id_rsa.pub | pbcopy
cat ~/.ssh/id_rsa.pub | pbcopy

# On Linux
xclip -sel clip < ~/.ssh/id_rsa.pub

# On Windows git bash or WSL
cat ~/.ssh/id_rsa.pub | clip

# Open without copying support all step above
cat ~/.ssh/id_rsa.pub
```

<!-- https://docs.gitlab.com/ee/user/ssh.html -->
<!-- https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent -->
