├── action
│   ├── auth-action.ts
│   └── calendar-action.ts
├── app
│   ├── (dashboard)
│   │   ├── client
│   │   │   ├── operator
│   │   │   └── page.tsx
│   │   ├── commission
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   ├── data.ts
│   │   │   │   ├── ecommerce-stats.tsx
│   │   │   │   ├── leads-stats-table.tsx
│   │   │   │   ├── orders
│   │   │   │   │   ├── data.ts
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── orders-table.tsx
│   │   │   │   ├── reports-area.tsx
│   │   │   │   ├── reports-snapshoteRR
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── reports-chart.tsx
│   │   │   │   ├── top-page.tsx
│   │   │   │   ├── top-ten.tsx
│   │   │   │   ├── user-device-report.tsx
│   │   │   │   ├── user-stats-chart.tsx
│   │   │   │   └── users-stat
│   │   │   │       ├── index.tsx
│   │   │   │       ├── users-data-chart.tsx
│   │   │   │       └── users-data-table.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page-view.tsx
│   │   │   └── page.tsx
│   │   ├── employee
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── lead
│   │   │   └── page.tsx
│   │   ├── not-logined
│   │   ├── profile
│   │   ├── project
│   │   │   ├── components
│   │   │   │   ├── active-task.tsx
│   │   │   │   ├── overdue-task.tsx
│   │   │   │   ├── project-budget-bar.tsx
│   │   │   │   ├── project-budget.tsx
│   │   │   │   ├── recent-activity.tsx
│   │   │   │   ├── report-chart.tsx
│   │   │   │   ├── reports.tsx
│   │   │   │   ├── stats.tsx
│   │   │   │   ├── top-contributer
│   │   │   │   │   ├── data.ts
│   │   │   │   │   ├── details-card.tsx
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── list-item.tsx
│   │   │   │   ├── upcoming-deadlines.tsx
│   │   │   │   ├── welcome-block.tsx
│   │   │   │   ├── workload.tsx
│   │   │   │   └── works-note.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page-view.tsx
│   │   │   └── page.tsx
│   │   ├── query
│   │   │   └── page.tsx
│   │   ├── report
│   │   │   ├── client
│   │   │   │   └── page.tsx
│   │   │   └── employee
│   │   └── zonal
│   │       ├── page.tsx
│   │       └── [zone]
│   │           └── page.tsx
│   ├── api
│   ├── assets
│   │   └── scss
│   │       ├── globals.scss
│   │       ├── partials
│   │       │   ├── _calendar.scss
│   │       │   ├── _map.scss
│   │       │   ├── _react-slect.scss
│   │       │   └── _shepherd.scss
│   │       └── theme.scss
│   ├── dictionaries.ts
│   ├── error-page
│   │   ├── 401
│   │   │   └── page.tsx
│   │   ├── 403
│   │   │   └── page.tsx
│   │   ├── 404
│   │   │   └── page.tsx
│   │   ├── 419
│   │   │   └── page.tsx
│   │   ├── 429
│   │   │   └── page.tsx
│   │   ├── 500
│   │   │   └── page.tsx
│   │   ├── 503
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── utility
│       ├── comming-soon
│       │   └── page.tsx
│       ├── layout.tsx
│       └── maintinance
│           └── page.tsx
├── components
│   ├── auth
│   │   ├── (login)
│   │   │   └── login
│   │   │       ├── login-form.tsx
│   │   │       └── page.tsx
│   │   ├── (register)
│   │   │   └── register
│   │   │       └── reg-form.tsx
│   │   ├── login-form.tsx
│   │   └── verify-form.tsx
│   ├── blank.tsx
│   ├── common
│   │   ├── Error.tsx
│   │   ├── Loading.tsx
│   │   ├── NoData.tsx
│   │   ├── PleaseLogin.tsx
│   │   └── ServerError.tsx
│   ├── dashboard
│   │   ├── (apps)
│   │   │   └── kanban
│   │   ├── (components)
│   │   │   ├── accordion
│   │   │   │   ├── accordion-with-border.tsx
│   │   │   │   ├── accordion-with-content.tsx
│   │   │   │   ├── accordion-with-icon.tsx
│   │   │   │   ├── accordion-with-subtitle.tsx
│   │   │   │   ├── accordion-without-arrow.tsx
│   │   │   │   ├── additional-actions.tsx
│   │   │   │   ├── basic-accordion.tsx
│   │   │   │   ├── collapse-icon-accordion.tsx
│   │   │   │   ├── custom-indicator.tsx
│   │   │   │   ├── simple-accordion.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── affix
│   │   │   ├── alert
│   │   │   │   ├── border-alert.tsx
│   │   │   │   ├── color-alert.tsx
│   │   │   │   ├── disbale-soft-icon.tsx
│   │   │   │   ├── dismissible-alert.tsx
│   │   │   │   ├── heading-alert-icon.tsx
│   │   │   │   ├── heading-alert.tsx
│   │   │   │   ├── link-alert.tsx
│   │   │   │   ├── outline-alert.tsx
│   │   │   │   ├── outline-dismissible-alert.tsx
│   │   │   │   ├── soft-aismissible-alert.tsx
│   │   │   │   ├── soft-alert.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── avatar
│   │   │   │   ├── avatar-border-color.tsx
│   │   │   │   ├── avatar-border.tsx
│   │   │   │   ├── avatar-group-block.tsx
│   │   │   │   ├── avatar-group-custom.tsx
│   │   │   │   ├── avatar-group-max.tsx
│   │   │   │   ├── avatar-group-size.tsx
│   │   │   │   ├── avatar-group-total.tsx
│   │   │   │   ├── avatar-size.tsx
│   │   │   │   ├── avatar-with-tooltip.tsx
│   │   │   │   ├── avatars-letter.tsx
│   │   │   │   ├── avatars-tonal.tsx
│   │   │   │   ├── fallback-avatar.tsx
│   │   │   │   ├── image-avatar.tsx
│   │   │   │   ├── rounded-avatar.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── badge
│   │   │   │   ├── badge-alignment.tsx
│   │   │   │   ├── badge-visibility.tsx
│   │   │   │   ├── badges-style.tsx
│   │   │   │   ├── badges-with-icon.tsx
│   │   │   │   ├── default-badge.tsx
│   │   │   │   ├── dot-style-badge.tsx
│   │   │   │   ├── outline-badge.tsx
│   │   │   │   ├── soft-badges.tsx
│   │   │   │   └── souce-code.ts
│   │   │   ├── breadcrumb
│   │   │   │   ├── collapsing-breadcrumb.tsx
│   │   │   │   ├── color-breadcrumb.tsx
│   │   │   │   ├── controlled-breadcrumb.tsx
│   │   │   │   ├── custom-separator.tsx
│   │   │   │   ├── customize-collapsing-breadcrumb.tsx
│   │   │   │   ├── defalut-breadcrumb.tsx
│   │   │   │   ├── disabled-breadcrumb.tsx
│   │   │   │   ├── menu-type-breadcrumb.tsx
│   │   │   │   ├── radius-breadcrumb.tsx
│   │   │   │   ├── routing-breadcrumb.tsx
│   │   │   │   ├── size-breadcrumb.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── start-icon-breadcrumb.tsx
│   │   │   │   ├── style-breadcrumb.tsx
│   │   │   │   └── underlines-breadcrumb.tsx
│   │   │   ├── button
│   │   │   │   ├── block-button.tsx
│   │   │   │   ├── default-button.tsx
│   │   │   │   ├── disabled-button.tsx
│   │   │   │   ├── ghost-button.tsx
│   │   │   │   ├── icon-button.tsx
│   │   │   │   ├── loader-button.tsx
│   │   │   │   ├── outline-button.tsx
│   │   │   │   ├── raised-button.tsx
│   │   │   │   ├── rounded-button.tsx
│   │   │   │   ├── rounded-outline.tsx
│   │   │   │   ├── size-button.tsx
│   │   │   │   ├── social-button.tsx
│   │   │   │   ├── social-icon-button.tsx
│   │   │   │   ├── soft-button.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   └── toggle-button.tsx
│   │   │   ├── calendar-page
│   │   │   ├── card
│   │   │   │   ├── default-card.tsx
│   │   │   │   ├── e-commerce-card.tsx
│   │   │   │   ├── link-card.tsx
│   │   │   │   ├── post-card.tsx
│   │   │   │   └── user-card.tsx
│   │   │   ├── carousel
│   │   │   │   └── source-code.ts
│   │   │   ├── color
│   │   │   ├── combobox
│   │   │   │   ├── basic-combobox.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── command
│   │   │   │   ├── basic-command.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── dialog
│   │   │   │   ├── backdrop-dialog.tsx
│   │   │   │   ├── basic-dialog.tsx
│   │   │   │   ├── counter-dialog.tsx
│   │   │   │   ├── dialog-autodestroyable.tsx
│   │   │   │   ├── dialog-colors.tsx
│   │   │   │   ├── dialog-form.tsx
│   │   │   │   ├── dialog-nondismisable.tsx
│   │   │   │   ├── dialog-placement.tsx
│   │   │   │   ├── dialog-sizes.tsx
│   │   │   │   ├── dialog-with-progressbar.tsx
│   │   │   │   ├── dialog-with-timeline.tsx
│   │   │   │   ├── multistep-slider-dialog.tsx
│   │   │   │   ├── radio-inputs-dialog.tsx
│   │   │   │   ├── scrollable-dialog.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   └── toggle-dialog.tsx
│   │   │   ├── dropdown
│   │   │   │   ├── alignment-options.tsx
│   │   │   │   ├── custom-dropdown.tsx
│   │   │   │   ├── default-dropdown.tsx
│   │   │   │   ├── dropdown-menu-item-color.tsx
│   │   │   │   ├── menu-content.tsx
│   │   │   │   ├── outline-dropdown.tsx
│   │   │   │   ├── outline-split-dropdown.tsx
│   │   │   │   ├── size-dropdown.tsx
│   │   │   │   ├── soft-dropdown.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── split-dropdown.tsx
│   │   │   │   ├── with-description.tsx
│   │   │   │   ├── with-icon.tsx
│   │   │   │   └── with-shortcut.tsx
│   │   │   ├── kbd
│   │   │   │   ├── arrow-kbd.tsx
│   │   │   │   ├── default-kbd.tsx
│   │   │   │   ├── in-text-kbd.tsx
│   │   │   │   ├── keys-kbd.tsx
│   │   │   │   ├── size-kbd.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   └── style-kbd.tsx
│   │   │   ├── pagination
│   │   │   │   └── dafault-pagi.tsx
│   │   │   ├── popover
│   │   │   │   ├── basic-popover.tsx
│   │   │   │   ├── popover-position.tsx
│   │   │   │   ├── progress-popover.tsx
│   │   │   │   └── user-popover.tsx
│   │   │   ├── progress
│   │   │   │   ├── animate-striped-progressbar.tsx
│   │   │   │   ├── circle-color-progress.tsx
│   │   │   │   ├── circle-progressbar-size.tsx
│   │   │   │   ├── color-progress.tsx
│   │   │   │   ├── custom-content-progressbar.tsx
│   │   │   │   ├── custom-text-progressbar.tsx
│   │   │   │   ├── default-circle-progressbar.tsx
│   │   │   │   ├── default-progress.tsx
│   │   │   │   ├── default-size-progress.tsx
│   │   │   │   ├── dynamic-progressbar.tsx
│   │   │   │   ├── loading-progressbar.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── stripped-progressbar.tsx
│   │   │   │   ├── width-value.tsx
│   │   │   │   └── with-label-progressbar.tsx
│   │   │   ├── sheet
│   │   │   │   ├── blog-card.tsx
│   │   │   │   ├── bottom-extraaction-sheet.tsx
│   │   │   │   ├── bottom-slide-sheet.tsx
│   │   │   │   ├── left-extraaction-sheet.tsx
│   │   │   │   ├── left-slide-sheet.tsx
│   │   │   │   ├── multilabel-sheet.tsx
│   │   │   │   ├── nested-sheet.tsx
│   │   │   │   ├── preview-sheet.tsx
│   │   │   │   ├── right-extraaction-sheet.tsx
│   │   │   │   ├── right-slide-sheet.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── submitform-sheet.tsx
│   │   │   │   ├── top-slide-sheet.tsx
│   │   │   │   └── topslide-extraaction-sheet.tsx
│   │   │   ├── skeleton
│   │   │   │   ├── default-skeleton.tsx
│   │   │   │   ├── e-commerce-counter-skeleton.tsx
│   │   │   │   ├── e-commerce-default-skeleton.tsx
│   │   │   │   ├── e-commerce-list-skeleton.tsx
│   │   │   │   ├── image-bottom-skeleton.tsx
│   │   │   │   ├── image-middle-skeleton.tsx
│   │   │   │   ├── image-top-skeleton.tsx
│   │   │   │   ├── profile-skeleton.tsx
│   │   │   │   ├── readmore-button-skeleton.tsx
│   │   │   │   ├── readmore-skeleton.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── steps
│   │   │   │   ├── alternative-label-step-gap.tsx
│   │   │   │   ├── alternative-label.tsx
│   │   │   │   ├── clickable-step.tsx
│   │   │   │   ├── default-steps.tsx
│   │   │   │   ├── error-alert-step.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── steps-size.tsx
│   │   │   │   ├── steps-with-action.tsx
│   │   │   │   ├── steps-with-datacontent.tsx
│   │   │   │   ├── steps-with-linespace.tsx
│   │   │   │   ├── v-steps.tsx
│   │   │   │   ├── vsteps-with-content.tsx
│   │   │   │   └── vsteps-with-linspace.tsx
│   │   │   ├── tabs
│   │   │   │   ├── basic-tabs.tsx
│   │   │   │   ├── colors-variants.tsx
│   │   │   │   ├── disabled-tabs.tsx
│   │   │   │   ├── icon-variants.tsx
│   │   │   │   ├── rounded-tabs.tsx
│   │   │   │   ├── sizes.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   └── style-variants.tsx
│   │   │   ├── timeline
│   │   │   │   ├── advanced-timeline.tsx
│   │   │   │   ├── alternative-reverse-timeline.tsx
│   │   │   │   ├── alternative-timeline.tsx
│   │   │   │   ├── basic-timeline.tsx
│   │   │   │   ├── color-dot-timeline.tsx
│   │   │   │   ├── left-timeline.tsx
│   │   │   │   ├── line-space-timeline.tsx
│   │   │   │   ├── outlined-timeline.tsx
│   │   │   │   ├── ping-line-space.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── timeline-with-card.tsx
│   │   │   │   ├── timeline-with-icon.tsx
│   │   │   │   └── timeline-with-ping.tsx
│   │   │   ├── toast
│   │   │   │   ├── react-hot-toast.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── tooltip
│   │   │   │   ├── arrow-tooltip.tsx
│   │   │   │   ├── color-tooltip.tsx
│   │   │   │   ├── control-tooltip.tsx
│   │   │   │   ├── default-tooltip.tsx
│   │   │   │   ├── offset-tooltip.tsx
│   │   │   │   ├── placement-tooltip.tsx
│   │   │   │   ├── source-code.ts
│   │   │   │   ├── various-tooltip.tsx
│   │   │   │   └── with-delay.tsx
│   │   │   ├── tour
│   │   │   │   └── steps.ts
│   │   │   ├── tree
│   │   │   │   ├── checkbox-tree.tsx
│   │   │   │   ├── default-tree.tsx
│   │   │   │   ├── handle-data-tree.tsx
│   │   │   │   ├── open-tree.tsx
│   │   │   │   └── source-code.ts
│   │   │   ├── typography
│   │   │   └── watermark
│   │   │       └── demo-app.tsx
│   │   └── user-profile
│   │       ├── activity
│   │       │   └── activity-timeline.tsx
│   │       ├── components
│   │       │   ├── header.tsx
│   │       │   └── settings-header.tsx
│   │       ├── documents
│   │       ├── overview
│   │       │   ├── about.tsx
│   │       │   ├── connections.tsx
│   │       │   ├── portfolio.tsx
│   │       │   ├── profile-progress.tsx
│   │       │   ├── projects
│   │       │   │   ├── components
│   │       │   │   │   ├── columns.tsx
│   │       │   │   │   ├── data-table-pagination.tsx
│   │       │   │   │   ├── data-table-row-actions.tsx
│   │       │   │   │   ├── data-table-toolbar.tsx
│   │       │   │   │   └── data-table.tsx
│   │       │   │   ├── data.ts
│   │       │   │   └── index.tsx
│   │       │   ├── recent-activity.tsx
│   │       │   ├── skills.tsx
│   │       │   ├── teams.tsx
│   │       │   └── user-info.tsx
│   │       ├── profile-layout.tsx
│   │       └── settings
│   │           ├── change-password.tsx
│   │           ├── comming-soon.tsx
│   │           ├── personal-details.tsx
│   │           ├── skills.tsx
│   │           ├── socials.tsx
│   │           └── user-meta.tsx
│   ├── dashboard-dropdown.tsx
│   ├── date-picker-with-range.tsx
│   ├── delete-confirmation-dialog.tsx
│   ├── error-block.tsx
│   ├── header-search.tsx
│   ├── layout-loader.tsx
│   ├── partials
│   │   ├── customizer
│   │   │   ├── footer-style.tsx
│   │   │   ├── header-style.tsx
│   │   │   ├── radius.tsx
│   │   │   ├── rtl-switch.tsx
│   │   │   ├── select-layout.tsx
│   │   │   ├── select-theme.tsx
│   │   │   ├── sidebar-change.tsx
│   │   │   ├── sidebar-image.tsx
│   │   │   ├── theme-change.tsx
│   │   │   └── theme-customizer.tsx
│   │   ├── footer
│   │   │   ├── footer-layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── mobile-footer.tsx
│   │   ├── header
│   │   │   ├── data.ts
│   │   │   ├── full-screen.tsx
│   │   │   ├── horizontal-header.tsx
│   │   │   ├── horizontal-menu.tsx
│   │   │   ├── inbox.tsx
│   │   │   ├── index.tsx
│   │   │   ├── language.tsx
│   │   │   ├── layout
│   │   │   │   └── classic-header.tsx
│   │   │   ├── mobile-menu-handler.tsx
│   │   │   ├── notification-data.ts
│   │   │   ├── notification-message.tsx
│   │   │   ├── profile-info.tsx
│   │   │   ├── theme-button.tsx
│   │   │   └── vertical-header.tsx
│   │   └── sidebar
│   │       ├── common
│   │       │   ├── logo.tsx
│   │       │   ├── menu-label.tsx
│   │       │   ├── multi-menu-handler.tsx
│   │       │   ├── multi-nested-menu.tsx
│   │       │   ├── nested-menus.tsx
│   │       │   └── sub-menu-item.tsx
│   │       ├── index.tsx
│   │       ├── mobile-sidebar
│   │       │   ├── index.tsx
│   │       │   ├── single-menu-item.tsx
│   │       │   └── sub-menu-handler.tsx
│   │       └── popover
│   │           ├── collapsed-hover-menu.tsx
│   │           ├── index.tsx
│   │           ├── single-menu-item.tsx
│   │           └── sub-menu-handler.tsx
│   ├── svg
│   │   ├── duel-tone
│   │   │   ├── application.svg
│   │   │   ├── authentication.svg
│   │   │   ├── bar-left.svg
│   │   │   ├── bar-top.svg
│   │   │   ├── bell.svg
│   │   │   ├── book.svg
│   │   │   ├── building-2.svg
│   │   │   ├── building.svg
│   │   │   ├── calendar.svg
│   │   │   ├── calender-check.svg
│   │   │   ├── calender.svg
│   │   │   ├── cart.svg
│   │   │   ├── chart-area.svg
│   │   │   ├── chart-bar.svg
│   │   │   ├── chart.svg
│   │   │   ├── clip-board.svg
│   │   │   ├── clip-board2.svg
│   │   │   ├── color-palater.svg
│   │   │   ├── components.svg
│   │   │   ├── cup.svg
│   │   │   ├── custom-icon.svg
│   │   │   ├── dashboard.svg
│   │   │   ├── device.svg
│   │   │   ├── diamond.svg
│   │   │   ├── docs-arrow.svg
│   │   │   ├── docs-check.svg
│   │   │   ├── dsearch.svg
│   │   │   ├── envelope.svg
│   │   │   ├── error.svg
│   │   │   ├── expand.svg
│   │   │   ├── files.svg
│   │   │   ├── flag.svg
│   │   │   ├── google.svg
│   │   │   ├── graph.svg
│   │   │   ├── grid.svg
│   │   │   ├── heroicon.svg
│   │   │   ├── icons.svg
│   │   │   ├── list-fill.svg
│   │   │   ├── list.svg
│   │   │   ├── location.svg
│   │   │   ├── logo.svg
│   │   │   ├── lucide-icon.svg
│   │   │   ├── mail.svg
│   │   │   ├── mail2.svg
│   │   │   ├── map.svg
│   │   │   ├── map2.svg
│   │   │   ├── medical.svg
│   │   │   ├── menu-bar.svg
│   │   │   ├── message.svg
│   │   │   ├── monitor.svg
│   │   │   ├── moon.svg
│   │   │   ├── note.svg
│   │   │   ├── note2.svg
│   │   │   ├── note3.svg
│   │   │   ├── pages.svg
│   │   │   ├── phone.svg
│   │   │   ├── pointer.svg
│   │   │   ├── pretention-chart-line.svg
│   │   │   ├── pretention-chart-line2.svg
│   │   │   ├── settings.svg
│   │   │   ├── sheild.svg
│   │   │   ├── stacks.svg
│   │   │   ├── sun.svg
│   │   │   ├── user-plus.svg
│   │   │   ├── user-sign.svg
│   │   │   ├── user.svg
│   │   │   └── web.svg
│   │   ├── home
│   │   │   ├── alert.svg
│   │   │   ├── check-mark.svg
│   │   │   ├── check-shape.svg
│   │   │   ├── counter.svg
│   │   │   ├── crown.svg
│   │   │   ├── cup-bar.svg
│   │   │   ├── cup.svg
│   │   │   ├── docs.svg
│   │   │   ├── eye.svg
│   │   │   ├── foldertree.svg
│   │   │   ├── increase.svg
│   │   │   ├── note.svg
│   │   │   ├── session.svg
│   │   │   ├── spam.svg
│   │   │   ├── stack.svg
│   │   │   └── users.svg
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── horizontal.svg
│   │   │   ├── semibox.svg
│   │   │   └── vertical.svg
│   │   └── man-vector.svg
│   ├── ui
│   │   ├── accordion.tsx
│   │   ├── affix.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card-snippet.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── checkbox.tsx
│   │   ├── cleave.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-group.tsx
│   │   ├── input.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── rating.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── steps.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── timeline.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── tree.tsx
│   │   ├── use-toast.ts
│   │   └── watermark
│   │       ├── index.ts
│   │       ├── watermark-stories.tsx
│   │       └── watermark.tsx
│   └── v1
│       ├── client
│       │   ├── client-notes.tsx
│       │   ├── individual-client-view.tsx
│       │   ├── onboarded-client.tsx
│       │   ├── onboarded-table
│       │   │   ├── components
│       │   │   │   ├── columns.tsx
│       │   │   │   ├── data-table-column-header.tsx
│       │   │   │   ├── data-table-faceted-filter.tsx
│       │   │   │   ├── data-table-pagination.tsx
│       │   │   │   ├── data-table-row-actions.tsx
│       │   │   │   ├── data-table-toolbar.tsx
│       │   │   │   ├── data-table-view-options.tsx
│       │   │   │   ├── data-table.tsx
│       │   │   │   └── user-nav.tsx
│       │   │   └── index.tsx
│       │   ├── update-client-date.tsx
│       │   └── update-client-form.tsx
│       ├── lead
│       │   ├── individual-leads-view.tsx
│       │   ├── LeadBreadCurb.tsx
│       │   ├── leads-page-view.tsx
│       │   ├── leads-table
│       │   │   ├── components
│       │   │   │   ├── columns.tsx
│       │   │   │   ├── data-table-column-header.tsx
│       │   │   │   ├── data-table-faceted-filter.tsx
│       │   │   │   ├── data-table-pagination.tsx
│       │   │   │   ├── data-table-row-actions.tsx
│       │   │   │   ├── data-table-toolbar.tsx
│       │   │   │   ├── data-table-view-options.tsx
│       │   │   │   ├── data-table.tsx
│       │   │   │   └── user-nav.tsx
│       │   │   └── index.tsx
│       │   ├── LeadsTable.tsx
│       │   ├── NewLeads.tsx
│       │   ├── Tabs
│       │   │   ├── LeadsTab.tsx
│       │   │   ├── OnBoardingTab.tsx
│       │   │   └── stepsForm
│       │   │       ├── ConsentLetterForm.tsx
│       │   │       ├── EFDMSForm.tsx
│       │   │       ├── LeadComment.tsx
│       │   │       └── OnBoardingForm.tsx
│       │   └── UpdateLead.tsx
│       ├── query
│       │   ├── CommentSection.tsx
│       │   ├── new
│       │   │   ├── Badge.tsx
│       │   │   ├── BottomFilter.tsx
│       │   │   ├── ListLoading.tsx
│       │   │   ├── Queries.tsx
│       │   │   ├── QuerySearch.tsx
│       │   │   └── TopFilter.tsx
│       │   ├── NewClientQuery.tsx
│       │   ├── QueryIndividualView.tsx
│       │   └── QueryView.tsx
│       ├── report
│       │   └── client-report-view.tsx
│       └── zonal
│           ├── pages
│           │   ├── IndividualZoneStats.tsx
│           │   ├── IndividualZoneView.tsx
│           │   ├── NewSalesPerson.tsx
│           │   ├── SalesPersonClientTable.tsx
│           │   ├── SalesPersonDetails.tsx
│           │   └── SalesPersonTable.tsx
│           ├── ZonalPageIndividualCard.tsx
│           └── ZonalPageView.tsx
├── config
│   ├── axios.config.ts
│   ├── calendar.config.ts
│   ├── menus.ts
│   ├── site.ts
│   ├── thems.ts
│   └── user.config.ts
├── data
│   ├── clients
│   │   ├── makeData.ts
│   │   └── query
│   │       └── makeData.ts
│   ├── globe.json
│   ├── industries.ts
│   └── option.ts
├── hooks
│   ├── use-media-query.ts
│   ├── use-mounted.ts
│   └── use-width.ts
├── jsconfig.json
├── lib
│   ├── appex-chart-options.ts
│   ├── auth.ts
│   ├── interface.ts
│   ├── type.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── provider
│   ├── auth.provider.tsx
│   ├── dashboard.layout.provider.tsx
│   ├── direction.provider.tsx
│   ├── providers.client.tsx
│   └── providers.tsx
├── README.md
├── schema
│   ├── client.ts
│   ├── commission.ts
│   ├── lead.ts
│   ├── onBoardingClient.ts
│   └── salesPerson.ts
├── store
│   └── index.ts
├── tailwind.config.ts
├── tree.md
├── tsconfig.json
├── types
│   ├── analytics.ts
│   ├── client.ts
│   ├── clientQuery.ts
│   ├── commission.ts
│   ├── contact.ts
│   ├── lead.ts
│   ├── onBoardingClients.ts
│   ├── operator.ts
│   ├── project.ts
│   ├── response.ts
│   ├── supabase.ts
│   └── user.ts
└── utils
    ├── analytics
    │   ├── dashboard.ts
    │   ├── profile.ts
    │   └── reporting.ts
    ├── auth
    │   ├── login.ts
    │   ├── logout.ts
    │   ├── register.ts
    │   └── update.ts
    ├── cn.ts
    ├── cookies.ts
    ├── email
    │   └── sendEmail.ts
    ├── formatting.ts
    ├── inputOptions.ts
    ├── queries
    │   ├── client
    │   │   ├── createQueries.ts
    │   │   ├── getQueries.ts
    │   │   └── updateQueries.ts
    │   ├── clientFiles
    │   │   └── getQueries.ts
    │   ├── clientQuery
    │   │   └── clientQueries.ts
    │   ├── commission
    │   │   ├── getQueries.ts
    │   │   └── updateQueries.ts
    │   ├── createQueries.ts
    │   ├── invoice
    │   │   └── getInvoices.ts
    │   ├── lead
    │   │   ├── createQueries.ts
    │   │   ├── getQueries.ts
    │   │   └── updateQueries.ts
    │   ├── local
    │   │   └── lead.tsx
    │   ├── onBoardingClient
    │   │   ├── createQueries.ts
    │   │   └── getQueries.ts
    │   ├── operator
    │   │   ├── createOperator.ts
    │   │   └── getOperators.ts
    │   ├── project
    │   │   ├── createQueries.ts
    │   │   ├── getQueries.ts
    │   │   └── updateQueries.ts
    │   ├── queries.ts
    │   ├── users
    │   │   ├── createQueries.ts
    │   │   └── getQueries.ts
    │   └── xero
    │       ├── connect.ts
    │       └── contact.ts
    ├── supabase.ts
    └── toast.ts
