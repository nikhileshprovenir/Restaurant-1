var Roller = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_VERSION: true,
    debugMode: true
});

 <script type="text/x-handlebars" id="application">
    <h1>Dice Roller</h1>
    {{outlet}}
</script>
<script type="text/x-handlebars" id="index">
    <p>
        {{#linkTo "roll"}}Start rolling dice!{{/linkTo}}
    </p>
</script>


Roller.Router.map(function () { 
    this.resource("roll");
});

Roller.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo("roll");
    }
});