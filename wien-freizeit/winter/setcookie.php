<?php
   if(isset($_COOKIE['popup']) && $_COOKIE['popup'] == "on")
   {
    $popup = "off";
   }
   else
   {
   $popup = "on";
   }
?>
<script  type="text/javascript">
function cookie()
{
if ("<?php echo $popup ?>" == "on")
xr_cpu(4);
}
</script>