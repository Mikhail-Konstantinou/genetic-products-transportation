pageManager = () => ({
    selectedTab: 0,

        /**
         * Function that switches between tabs of the hero
         */ 
        changeTab(index) {
            this.selectedTab = index;
            if (this.selectedTab < 0) {
                this.selectedTab = 0;
            }
            if (this.selectedTab > 3) {
                this.selectedTab = 3
            }
        }
});