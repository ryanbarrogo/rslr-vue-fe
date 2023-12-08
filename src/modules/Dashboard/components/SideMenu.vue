<template>
    <v-navigation-drawer
        id="navigation-drawer"
        v-model="drawer"
        permanent
        width="215"
    >
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/86.jpg"
                title="Ryan Barrogo"
                nav
            >
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="toggleDrawer"></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list id="SideMenu" density="compact">
            <div
                v-for="menuItem in menuItems"
                :key="menuItem.id"
                class="list-item-container mb-1"
            >
                <v-list-item
                    class="side-menu-item-btn btn btn-block"
                    :class="[{'not-collapsed': menuItem.id === expandedItem}]"
                    :id="menuItem.id"
                    @click="toggleCollapse(menuItem.id)"
                >
                    <div class="menu-item-icon" :class="menuItem.icon.classList">
                        <font-awesome-icon :icon="menuItem.icon.faIcon"/>
                    </div>
                    <div class="menu-item-text">
                        {{ menuItem.text }}
                    </div>
                </v-list-item>

                <v-expand-transition>
                    <div
                        v-show="isExpanded(menuItem.id)"
                        class="sub-menu-items"
                    >
                        <v-list class="nav nav-sm flex-column">
                            <v-list-item
                                v-for="(subItem, smKey) in menuItem.subMenu"
                                :key="smKey"
                                :class="[
                                    subItem.classList,
                                    {'active': isSubItemActive(subItem.activators)}
                                ]"
                                @click.stop="$router.push(subItem.url)"
                            >
                                {{ subItem.text }}
                            </v-list-item>
                        </v-list>
                    </div>
                </v-expand-transition>
            </div>
        </v-list>

        <v-col>
            <v-switch
                v-model="currentTheme"
                hide-details
                true-value="Dark"
                false-value="Light"
                @click="toggleTheme"
                :label="`${currentTheme} Theme`"
            ></v-switch>
        </v-col>
    </v-navigation-drawer>
</template>

<script>
import {toRefs} from 'vue';
import {useTheme} from 'vuetify'
import {useSideMenuStore} from "@/store/sideMenuStore";

export default {
    setup() {
        const sideMenuStore = useSideMenuStore();
        const {drawer, toggleDrawer} = toRefs(sideMenuStore);
        const theme = useTheme()

        return {
            drawer,
            toggleDrawer,
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        };
    },
    name: "SideMenu",
    props: {
        supportSession: {
            type: Boolean,
            default: false,
        },
        excludedFormFields: {
            type: [Array, Object],
            default: () => [],
        },
        timeCardUsers: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentTheme: 'Light',
            sideMenuRendered: false,
            permissionCheckIntervalId: null,
            expandedItem: null,
            menuItems: [
                {
                    id: 'home-nav',
                    text: 'Dashboard',
                    groupId: 'menu-item-home-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-house',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Home Page',
                            id: 'home-page-nav',
                            url: '/dashboard',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/dashboard'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Actions',
                            id: 'home-actions-nav',
                            url: '/dashboard/actions',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/dashboard/actions'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Live Status',
                            id: 'home-live-status-nav',
                            url: '/live-status',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/live-status'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ],
                },
                {
                    id: 'referrals-nav',
                    text: 'Referrals',
                    groupId: 'menu-item-referrals-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-user-check',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Referrals',
                            id: 'referrals-client-search-nav',
                            url: '/client/referrals',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client/referrals'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'clients-nav',
                    text: 'Service User',
                    groupId: 'menu-item-client-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-user',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'clients-new-nav',
                            url: '/client/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client/create'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'clients-search-nav',
                            url: '/client',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/client'],
                                regex: [
                                    /^\/client\/\d+.*$/,
                                    /^\/client-care-plan\/.*$/,
                                    /^\/client-professionals\/.*$/,
                                    /^\/client-contacts\/.*$/,
                                    /^\/contact-log\/edit\/(\d+)\?referrer=client-(\w+)-(\d+)$/,
                                    /^\/contact-log\/create-with-default\?referrer=client-(\w+)-(\d+)$/,
                                ],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'carers-nav',
                    text: 'Care Support Worker',
                    groupId: 'menu-item-carer-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-user-nurse',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'carers-new-nav',
                            url: '/employee/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/employee/create'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'carers-search-nav',
                            url: '/employee',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/employee'],
                                regex: [
                                    /^\/employee\/(\d+)#.*$/,
                                    /^\/employee\/(\d+)\/edit#?.*$/,
                                    /^\/holiday\/.*$/,
                                    /^\/sickness\/.*$/,
                                    /^\/carer-jobs\/.*$/,
                                    /^\/employee-availability\/.*$/,
                                    /^\/contact-log\/edit\/(\d+)\?referrer=employee-(\w+)-(\d+)$/,
                                    /^\/contact-log\/create-with-default\?referrer=employee-(\w+)-(\d+)$/,
                                ],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'visits-nav',
                    text: 'Visits',
                    groupId: 'menu-item-visits-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-calendar-week',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Daily Overview',
                            id: 'visits-daily-overview-nav',
                            url: '/daily-overview',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/daily-overview'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Jobs',
                            id: 'visits-jobs-nav',
                            url: '/jobs',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/jobs'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Group Activities',
                            id: 'visits-group-activities-nav',
                            url: '/group-activities',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/group-activities'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Visit Publishing',
                            id: 'visits-publishing-nav',
                            url: '/visit-publishing',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/visit-publishing/'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Problem Visits',
                            id: 'visits-problem-nav',
                            url: '/problem-visits',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/problem-visits'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Tasks',
                            id: 'visits-tasks-nav',
                            url: '/task',
                            classList: null,
                            excludedFormFieldName: 'nav-bar-task',
                            activators: {
                                url: ['/task'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'rounds-nav',
                    text: 'Rounds',
                    groupId: 'menu-item-rounds-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-car',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'rounds-new-nav',
                            url: '/rounds/create#CreateRun',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds/create#CreateRun'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'rounds-search-nav',
                            url: '/rounds#Search',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds#Search'],
                                regex: [
                                    /^\/rounds\/(\d+).*$/,
                                ],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Generate',
                            id: 'rounds-generate-nav',
                            url: '/rounds/generate#Generate',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/rounds/generate#Generate'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'communications-nav',
                    text: 'Communications',
                    groupId: 'menu-item-communications-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-phone',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New Contact Log',
                            id: 'communications-new-contact-log-nav',
                            url: '/contact-log/create',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/contact-log/create'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search Contact Logs',
                            id: 'communications-contact-log-search-nav',
                            url: '/contact-log',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/contact-log'],
                                regex: [/^\/contact-log\/edit\/\d+.*$/],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Call Log',
                            id: 'communications-call-log-search-nav',
                            url: '/carer-call-log',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/carer-call-log'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'finance-nav',
                    text: 'Finance',
                    groupId: 'menu-item-finance-sub-menu',
                    classList: null,
                    permissions: [],
                    icon: {
                        faIcon: 'fa-sterling-sign',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'Payroll',
                            id: 'finance-payroll-nav',
                            url: '/payroll',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/payroll'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Payroll Exports',
                            id: 'finance-payroll-exports-nav',
                            url: '/payroll/previous-exports',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/payroll/previous-exports'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Funder Maintenance',
                            id: 'finance-funder-maintenance-nav',
                            url: '/funder',
                            classList: null,
                            excludedFormFieldName: null,
                            activators: {
                                url: ['/funder'],
                                regex: [/^\/funder.*$/],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'invoicing-nav',
                    text: 'Invoicing',
                    groupId: 'menu-item-invoicing-sub-menu',
                    classList: null,
                    menuConfiguration: 'invoicing._self.enabled.side',
                    permissions: [],
                    icon: {
                        faIcon: 'fa-receipt',
                        classList: '',
                    },
                    subMenu: [
                        {
                            text: 'New',
                            id: 'invoicing-new-nav',
                            url: '/invoicing/create',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.new.enabled.side',
                            activators: {
                                url: ['/invoicing/create'],
                                regex: [],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Search',
                            id: 'invoicing-search-nav',
                            url: '/invoicing',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.search.enabled.side',
                            activators: {
                                url: ['/invoicing'],
                                regex: [/^\/invoicing\/(\d+).*$/],
                            },
                            permissions: [],
                        },
                        {
                            text: 'Generate',
                            id: 'invoice-generate-nav',
                            url: '/invoicing/generate',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'invoicing.generate.enabled.side',
                            activators: {
                                url: ['/invoicing/generate'],
                                regex: [],
                            },
                            permissions: [],
                        },
                    ]
                },
                {
                    id: 'timesheet-nav',
                    text: 'Timesheet Management',
                    groupId: 'menu-item-timesheet-management-sub-menu',
                    classList: null,
                    menuConfiguration: 'timesheetMgmt._self.enabled.side',
                    permissions: [],
                    icon: {
                        faIcon: 'fa-clock',
                        classList: 'timesheet-management-icon-custom-style',
                    },
                    subMenu: [
                        {
                            text: 'Timesheet Processing',
                            id: 'timesheet-processing-nav',
                            url: '/timesheet-mgmt/processing',
                            classList: null,
                            excludedFormFieldName: null,
                            menuConfiguration: 'timesheetMgmt.timesheet_processing.enabled.side',
                            activators: {
                                url: ['/timesheet-mgmt/processing/'],
                                regex: [/^\/timesheet-mgmt\/.*$/],
                            },
                            permissions: [],
                        },
                    ]
                },
            ],
        }
    },

    methods: {
        isParentActive(menuItem) {
            for (const subMenu of menuItem.subMenu) {
                if (this.isSubItemActive(subMenu.activators)) {
                    return true;
                }
            }

            return false;
        },
        isSubItemActive(activators) {
            let urls = activators?.url ?? [];
            let regexes = activators?.regex ?? [];

            if (regexes.length) {
                for (const regex of regexes) {
                    if (regex.test(window.location.pathname + window.location.hash)) {
                        return true;
                    }
                }
            }

            if (urls.length) {
                for (const url of urls) {
                    if (window.location.pathname + window.location.hash === url) {
                        return true;
                    }
                }
            }

            return false;
        },
        toggleCollapse(itemId) {
            if (this.expandedItem === itemId) {
                this.expandedItem = null;
                return;
            }

            this.expandedItem = itemId;
        },
        isExpanded(itemId) {
            return this.expandedItem === itemId;
        },
    },
    mounted() {
    }
}
</script>

<style lang="scss">
@import "/src/assets/styles/sass/variables";

@mixin hover-effect {
    &.active,
    &:hover {
        color: $RSLR_WHITE !important;
        border-radius: unset !important;
        background: $RSLR_BLUE !important;
    }
}

#navigation-drawer {
    .v-navigation-drawer__content::-webkit-scrollbar {
        display: none;
    }
}

#SideMenu {
    .side-menu-item-btn {
        border: 0;
        font-size: .85rem !important;
        font-weight: 300;
        padding: 10px 18px;
        transition: none;
        @include hover-effect;

        &.not-collapsed {
            border-left: 5px solid $RSLR_BLUE !important;
            border-radius: unset !important;
            padding: 10px 13px;
            @include hover-effect;
        }

        &:focus {
            outline: none;
            box-shadow: none;
        }

        .menu-item-icon {
            position: absolute;
            margin-left: 6px;
            margin-top: 3px;
            justify-content: left;
            display: flex;

            svg {
                color: $RSLR_ORANGE;
            }
        }

        .menu-item-text {
            justify-content: left;
            text-align: left;
            display: flex;
            margin-left: 30px;
        }

        img {
            .iqtc-logo-dimensions {
                height: 21px;
                width: auto;
            }

            .navbar-brand-iqtc-img {
                max-height: 2.1rem !important;
            }
        }
    }

    .sub-menu-items {
        margin-left: 20px;

        .v-list {
            padding: 0 !important;

            .v-list-item {
                border-left: 5px solid $RSLR_BLUE;
                cursor: pointer;
                padding: 0 19px;
                min-height: 40px;
                @include hover-effect;

                a {
                    text-decoration: none;
                    color: var(--v-theme-primary);
                }
            }
        }
    }

    .timesheet-management-icon-custom-style {
        line-height: 30px;
    }
}
</style>