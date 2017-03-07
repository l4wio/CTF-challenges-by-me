#!/usr/bin/ruby
require "fileutils"
require "webrick/log"
require "cgi"

$stderr.reopen(File.new('/dev/null', 'w'))

OK_200 = <<EOF
HTTP/1.1 200 OK
Content-type: text/html

%s
EOF

NF_404 = <<EOF
HTTP/1.1 404 Not Found
Content-type: text/html

404
EOF

$DIR        = File.expand_path File.dirname(__FILE__)
$HTTP       = {:ip => ENV["REMOTE_HOST"],:buffer => "",:response => NF_404,:user => nil}
$HTTP.merge!(:perm => $HTTP[:ip] == File.read(File.join($DIR,'ip_admin')).strip ? 1 : 0)
ipdir       = File.join('/tmp','simplehttp',$HTTP[:ip])
Dir.chdir !Dir.exists?(ipdir) ? ( !FileUtils.mkdir_p(ipdir) ? exit : ipdir ): ipdir

while line = $stdin.gets; break if ($HTTP[:buffer]+=line).include? "\r\n\r\n" end

def say_hello()    "Hello #{$HTTP[:user]}! | perm: #{$HTTP[:perm]}"                                                         end
def your_ip()      "Your IP: #{$HTTP[:ip]}"                                                                                 end
def index()        "You can't escape my <a href=/guest/hello>box</a><br /><img src='https://goo.gl/msKPnQ' />."             end
def admin_log()    !$HTTP[:user].nil? && File.exists?($HTTP[:user]+".txt") ? File.read($HTTP[:user]+".txt") : "None"        end
def admin()
    exit if !(l = WEBrick::Log.new($HTTP[:user].nil? ? STDOUT : $HTTP[:user]+".txt" ))
    $HTTP.each {|x|l.log(4,x.to_s)} && l.log(4,"------")
    return File.read(File.join($DIR,"secret_admin"))
end

handlers = {
    :index  => {:path => '/guest/',          :func => method(:index          ), :perm => 0},
    :hello  => {:path => '/guest/hello',     :func => method(:say_hello      ), :perm => 0},
    :ip     => {:path => '/guest/ip',        :func => method(:your_ip        ), :perm => 0},
    :admin  => {:path => '/admin/secret',    :func => method(:admin          ), :perm => 1},
    :log    => {:path => '/admin/log',       :func => method(:admin_log      ), :perm => 1},
}

headers = $HTTP[:buffer].split("\r\n")
first = headers[0].split()
$HTTP.merge!({:method => first[0],:path => first[1],:version => first[2]})

headers.each {|val| $HTTP[:user] = $HTTP[:user].nil? && val.index("Cookie: user=")==0 ? val[13..-1].split()[0].split(";")[0][0..16].gsub(".","_") : nil}

(puts NF_404; exit) if $HTTP[:perm] < 1 && $HTTP[:path].index("/guest/")!=0
(puts NF_404; exit) if $HTTP[:path][7..-1].index("/") || $HTTP[:path][7..-1].index("%2f")
$HTTP[:path] = CGI::unescape($HTTP[:path])
handlers.each {|k,v|$HTTP[:response] = OK_200 % v[:func].call if $HTTP[:path].end_with?(v[:path])}
puts $HTTP[:response].strip