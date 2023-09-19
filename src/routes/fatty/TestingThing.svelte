<script>
    let value = ''
    
    $: sanitized = value.replace(/[^\d]/gu, '')
</script>


<input bind:value />

<p>
    display value: {value}
</p>

<p>
    display value: {sanitized}
</p>