<template>
    <div id="app">
        <h1>
            <router-link :to="{ name: 'homepage'}">
                <img src="./assets/logo.png" alt="TrailMaps.co.uk GPX" title>
            </router-link>
        </h1>

        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
}
</script>
