---
title: Laravel User ID to UUID
image: '~/assets/images/laravel-user-id-to-uuid.svg'
excerpt: Laravel using UUID instead of ID for user table
category: laravel
publishDate: 2024-08-25T01:05:00+07:00
tags:
  - Php
  - Laravel
---

I just got a problem when I switch from `id` to `uuid` for user table. When I use session with database `SESSION_DRIVER=database`, I got this error:

```bash
Invalid text representation: 7 ERROR:  invalid input syntax for type bigint: '...' Connection: pgsql, SQL: update "sessions" set "payload"
```

Finally, I found the solution. The problem is that Laravel using `foreignId` instead of `foreignUuid` for `sessions` table. So I change it to `foreignUuid` and it works.

```php
// timestamp_create_users_table.php
Schema::create('users', function (Blueprint $table) {
  $table->uuid('id');
  $table->string('name');
  $table->string('email')->unique();
  $table->timestamp('email_verified_at')->nullable();
  $table->string('password');
  $table->rememberToken();
  $table->timestamps();
});

```

```php
// timestamp_create_sessions_table.php
Schema::create('sessions', function (Blueprint $table) {
    $table->string('id')->primary();
    $table->foreignId('user_id')->nullable()->index();
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->longText('payload');
    $table->integer('last_activity')->index();
});

```

But if we already run migrated for `users` and `sessions` table. We can create new migrate as below:

```php
// timestamp_update_session_table.php
public function up(): void
{
  Schema::table('sessions', function (Blueprint $table) {
    $table->dropIndex(['user_id']);
    $table->dropColumn('user_id');
  });

  Schema::table('sessions', function (Blueprint $table) {
    $table->foreignUuid('user_id')->nullable()->index();
  });
}

public function down(): void
{
  Schema::table('sessions', function (Blueprint $table) {
    $table->dropIndex(['user_id']);
    $table->dropColumn('user_id');
  });

  Schema::table('sessions', function (Blueprint $table) {
    $table->foreignId('user_id')->nullable()->index();
  });
}
```
