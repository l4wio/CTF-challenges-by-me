<title>CrypotCrypotCrypot</title>
<pre><h3>
<?php
$FLAG = '0x3004{p_to_the_h_to_the_p_yo!}';
$LENGTH_FLAG = strlen($FLAG);
$KEY = empty($_GET['key']) ? "TEST" : $_GET['key'];
$sha1_all = hash("sha512","\x00",true); //init

echo "Your KEY : <font color=Green>$KEY</font>\n";
for($i=0; $i < $LENGTH_FLAG; $i++){
	$KEY[$i] = empty($KEY[$i]) ? "\xff" : $KEY[$i];
	$c = $KEY[$i].str_repeat($FLAG[$i],$LENGTH_FLAG - strlen($KEY[$i]));
	$sha1_all ^= hash("sha512",$c,true);
}
echo "Your FLAG: <font color=Red>".bin2hex($sha1_all ^ $FLAG)."</font>\n\n";

?>
--
//index.php
</h3></pre>


<code><span style="color: #000000">
&lt;title&gt;CrypotCrypotCrypot&lt;/title&gt;
<br />&lt;pre&gt;&lt;h3&gt;
<br /><span style="color: #0000BB">&lt;?php
<br />$FLAG&nbsp;</span><span style="color: #007700">=&nbsp;</span><span style="color: #DD0000">'XXXXXXXXXXXXXXX_censored_XXXXXXXXXXXXX'</span><span style="color: #007700">;
<br /></span><span style="color: #0000BB">$LENGTH_FLAG&nbsp;</span><span style="color: #007700">=&nbsp;</span><span style="color: #0000BB">strlen</span><span style="color: #007700">(</span><span style="color: #0000BB">$FLAG</span><span style="color: #007700">);
<br /></span><span style="color: #0000BB">$KEY&nbsp;</span><span style="color: #007700">=&nbsp;empty(</span><span style="color: #0000BB">$_GET</span><span style="color: #007700">[</span><span style="color: #DD0000">'key'</span><span style="color: #007700">])&nbsp;?&nbsp;</span><span style="color: #DD0000">"TEST"&nbsp;</span><span style="color: #007700">:&nbsp;</span><span style="color: #0000BB">$_GET</span><span style="color: #007700">[</span><span style="color: #DD0000">'key'</span><span style="color: #007700">];
<br /></span><span style="color: #0000BB">$sha1_all&nbsp;</span><span style="color: #007700">=&nbsp;</span><span style="color: #0000BB">hash</span><span style="color: #007700">(</span><span style="color: #DD0000">"sha512"</span><span style="color: #007700">,</span><span style="color: #DD0000">"\x00"</span><span style="color: #007700">,</span><span style="color: #0000BB">true</span><span style="color: #007700">);&nbsp;</span><span style="color: #FF8000">//init
<br />
<br /></span><span style="color: #007700">echo&nbsp;</span><span style="color: #DD0000">"Your&nbsp;KEY&nbsp;:&nbsp;&lt;font&nbsp;color=Green&gt;</span><span style="color: #0000BB">$KEY</span><span style="color: #DD0000">&lt;/font&gt;\n"</span><span style="color: #007700">;
<br />for(</span><span style="color: #0000BB">$i</span><span style="color: #007700">=</span><span style="color: #0000BB">0</span><span style="color: #007700">;&nbsp;</span><span style="color: #0000BB">$i&nbsp;</span><span style="color: #007700">&lt;&nbsp;</span><span style="color: #0000BB">$LENGTH_FLAG</span><span style="color: #007700">;&nbsp;</span><span style="color: #0000BB">$i</span><span style="color: #007700">++){
<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">$KEY</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">]&nbsp;=&nbsp;empty(</span><span style="color: #0000BB">$KEY</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">])&nbsp;?&nbsp;</span><span style="color: #DD0000">"\xff"&nbsp;</span><span style="color: #007700">:&nbsp;</span><span style="color: #0000BB">$KEY</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">];
<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">$c&nbsp;</span><span style="color: #007700">=&nbsp;</span><span style="color: #0000BB">$KEY</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">].</span><span style="color: #0000BB">str_repeat</span><span style="color: #007700">(</span><span style="color: #0000BB">$FLAG</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">],</span><span style="color: #0000BB">$LENGTH_FLAG&nbsp;</span><span style="color: #007700">-&nbsp;</span><span style="color: #0000BB">strlen</span><span style="color: #007700">(</span><span style="color: #0000BB">$KEY</span><span style="color: #007700">[</span><span style="color: #0000BB">$i</span><span style="color: #007700">]));
<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">$sha1_all&nbsp;</span><span style="color: #007700">^=&nbsp;</span><span style="color: #0000BB">hash</span><span style="color: #007700">(</span><span style="color: #DD0000">"sha512"</span><span style="color: #007700">,</span><span style="color: #0000BB">$c</span><span style="color: #007700">,</span><span style="color: #0000BB">true</span><span style="color: #007700">);
<br />}
<br />echo&nbsp;</span><span style="color: #DD0000">"Your&nbsp;FLAG:&nbsp;&lt;font&nbsp;color=Red&gt;"</span><span style="color: #007700">.</span><span style="color: #0000BB">bin2hex</span><span style="color: #007700">(</span><span style="color: #0000BB">$sha1_all&nbsp;</span><span style="color: #007700">^&nbsp;</span><span style="color: #0000BB">$FLAG</span><span style="color: #007700">).</span><span style="color: #DD0000">"&lt;/font&gt;\n\n"</span><span style="color: #007700">;
<br />
<br /></span><span style="color: #0000BB">?&gt;
<br /></span>--
<br />&lt;/h3&gt;&lt;/pre&gt;
<br /></span>
</code>
</h3></pre>

