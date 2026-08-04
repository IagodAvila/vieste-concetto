CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text NOT NULL,
	`product_slug` text NOT NULL,
	`product_name` text NOT NULL,
	`size` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_amount` integer NOT NULL,
	`total_amount` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `order_items_order_id_idx` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`reference_id` text NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`customer_document` text NOT NULL,
	`postal_code` text NOT NULL,
	`address` text NOT NULL,
	`address_number` text NOT NULL,
	`address_complement` text,
	`district` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`shipping_method` text DEFAULT 'standard' NOT NULL,
	`shipping_amount` integer DEFAULT 0 NOT NULL,
	`subtotal_amount` integer NOT NULL,
	`total_amount` integer NOT NULL,
	`pagbank_checkout_id` text,
	`payment_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_reference_id_unique` ON `orders` (`reference_id`);--> statement-breakpoint
CREATE INDEX `orders_status_idx` ON `orders` (`status`);--> statement-breakpoint
CREATE TABLE `payment_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text NOT NULL,
	`provider_event_id` text,
	`provider_status` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `payment_events_order_id_idx` ON `payment_events` (`order_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payment_events_provider_event_id_unique` ON `payment_events` (`provider_event_id`);