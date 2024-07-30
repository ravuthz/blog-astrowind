---
title: Laravel Eloquent Query
image: '~/assets/images/laravel-eloquent.svg'
excerpt: Laravel Eloquent functions to query data from database
category: laravel
publishDate: 2024-07-31T09:45:02+07:00
tags:
  - Php
  - Laravel
---

## Retrieve single user record from database with/without exception

```php
# Retrieve the user record from database or null
$user = User::find(1);
$user = User::where('id', 1)->first();

# Retrieve the user record from database with exception if not found
$user = User::findOrFail(1);
$user = User::where('id', 1)->firstOrFail();
```

## Retrieve all records from database with sorting

```php
# Retrieve all user records from database
$users = User::all();

# Retrieve the all user records from database order by created_at column descending
$users = User::latest()->get();
$users = User::orderBy('created_at', 'desc')->get();
```

## Retrieve some records from database with limit or pagination

```php
# Retrieve the 10 user records from database as paginated data, the page with change from request
$users = User::paginate(10);
$users = User::offset(request()->get('page', 1))->limit(10)->get();
```

## Retrieve unique user record from database with/without exception

````php

### Logging the executed query of Eloquent

```bash
DB::enableQueryLog();

$users = User::paginate(10);

dd(DB::getQueryLog());
````
